// node and express imports
const { promisify } = require("util");

// third party imports
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// local imports
const db = require("../../database/db");
const AppError = require("../../utils/appError");
const catchAsyncError = require("../../utils/catchAsyncError");
const { sendOTPEmail, generateOTP } = require("../../utils/resendService");

// ============================================================
// SIGNUP — Email + Password + Name + Mobile → Send OTP
// ============================================================
exports.signup = catchAsyncError(async (req, res, next) => {
  const { customer_name, customer_email, mobile, password } = req.body;

  if (!customer_email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  if (!customer_name) {
    return next(new AppError("Name is required", 400));
  }

  // Check if email already exists
  const existingCustomer = await db(
    "SELECT * FROM CUSTOMERS WHERE customer_email = ?",
    [customer_email]
  );

  if (existingCustomer.length > 0) {
    // If exists but not verified, allow re-signup (update details + resend OTP)
    if (!existingCustomer[0].email_verified) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = generateOTP();
      const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      await db(
        "UPDATE CUSTOMERS SET customer_name = ?, mobile = ?, password = ?, email_otp = ?, otp_expires_at = ? WHERE customer_email = ?",
        [customer_name, mobile || "", hashedPassword, otp, otpExpiresAt, customer_email]
      );

      // Send OTP email
      try {
        await sendOTPEmail(customer_email, otp);
      } catch (emailErr) {
        console.error("Failed to send OTP email:", emailErr.message);
        return next(new AppError("Failed to send verification email. Please try again.", 500));
      }

      return res.status(200).json({
        success: true,
        message: "OTP sent to your email for verification",
        email: customer_email,
        requiresVerification: true,
      });
    }

    return next(new AppError("An account with this email already exists", 400));
  }

  // Check if mobile already exists (if provided)
  if (mobile) {
    const existingMobile = await db(
      "SELECT * FROM CUSTOMERS WHERE mobile = ? AND mobile != ''",
      [mobile]
    );
    if (existingMobile.length > 0) {
      return next(new AppError("This mobile number is already registered", 400));
    }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate OTP
  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // Insert customer with email_verified = false
  const result = await db(
    "INSERT INTO CUSTOMERS (customer_name, customer_email, mobile, password, email_otp, otp_expires_at, email_verified) VALUES (?, ?, ?, ?, ?, ?, 0)",
    [customer_name, customer_email, mobile || "", hashedPassword, otp, otpExpiresAt]
  );

  console.log("Customer created with ID:", result.insertId, "OTP:", otp);

  // Send OTP email via Resend
  try {
    await sendOTPEmail(customer_email, otp);
  } catch (emailErr) {
    console.error("Failed to send OTP email:", emailErr.message);
    // Delete the customer since email sending failed
    await db("DELETE FROM CUSTOMERS WHERE customer_id = ?", [result.insertId]);
    return next(new AppError("Failed to send verification email. Please try again.", 500));
  }

  res.status(201).json({
    success: true,
    message: "OTP sent to your email for verification",
    email: customer_email,
    requiresVerification: true,
  });
});

// ============================================================
// VERIFY OTP — Verify email OTP and complete registration
// ============================================================
exports.verifyOtp = catchAsyncError(async (req, res, next) => {
  const { customer_email, otp } = req.body;

  if (!customer_email || !otp) {
    return next(new AppError("Email and OTP are required", 400));
  }

  // Find customer
  const customers = await db(
    "SELECT * FROM CUSTOMERS WHERE customer_email = ?",
    [customer_email]
  );

  if (customers.length === 0) {
    return next(new AppError("No account found with this email", 404));
  }

  const customer = customers[0];

  // Already verified
  if (customer.email_verified) {
    return next(new AppError("Email is already verified. Please login.", 400));
  }

  // Check OTP
  if (customer.email_otp !== otp) {
    return next(new AppError("Invalid OTP. Please try again.", 400));
  }

  // Check expiry
  if (new Date() > new Date(customer.otp_expires_at)) {
    return next(new AppError("OTP has expired. Please request a new one.", 400));
  }

  // Mark as verified and clear OTP
  await db(
    "UPDATE CUSTOMERS SET email_verified = 1, email_otp = NULL, otp_expires_at = NULL WHERE customer_id = ?",
    [customer.customer_id]
  );

  // Generate JWT token (auto-login after verification)
  const token = jwt.sign(
    { customer_id: customer.customer_id, customer_email: customer.customer_email, mobile: customer.mobile },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  console.log("Email verified for customer:", customer.customer_id);

  res.status(200).json({
    success: true,
    message: "Email verified successfully",
    token,
    id: customer.customer_id,
    new_user: true,
  });
});

// ============================================================
// RESEND OTP — Generate new OTP and resend email
// ============================================================
exports.resendOtp = catchAsyncError(async (req, res, next) => {
  const { customer_email } = req.body;

  if (!customer_email) {
    return next(new AppError("Email is required", 400));
  }

  // Find customer
  const customers = await db(
    "SELECT * FROM CUSTOMERS WHERE customer_email = ?",
    [customer_email]
  );

  if (customers.length === 0) {
    return next(new AppError("No account found with this email", 404));
  }

  const customer = customers[0];

  if (customer.email_verified) {
    return next(new AppError("Email is already verified", 400));
  }

  // Generate new OTP
  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await db(
    "UPDATE CUSTOMERS SET email_otp = ?, otp_expires_at = ? WHERE customer_id = ?",
    [otp, otpExpiresAt, customer.customer_id]
  );

  console.log("Resend OTP for customer:", customer.customer_id, "OTP:", otp);

  // Send OTP email
  try {
    await sendOTPEmail(customer_email, otp);
  } catch (emailErr) {
    console.error("Failed to resend OTP email:", emailErr.message);
    return next(new AppError("Failed to send verification email. Please try again.", 500));
  }

  res.status(200).json({
    success: true,
    message: "OTP resent to your email",
  });
});

// ============================================================
// LOGIN — Email + Password (requires verified email)
// ============================================================
exports.login = catchAsyncError(async (req, res, next) => {
  const { customer_email, password } = req.body;

  if (!customer_email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  // Test credentials bypass
  if (customer_email === "test@test.com" && password === "test1234") {
    const existingCustomer = await db(
      "SELECT * FROM CUSTOMERS WHERE customer_email = ?",
      [customer_email]
    );

    let customer_id;
    if (existingCustomer.length === 0) {
      const result = await db(
        "INSERT INTO CUSTOMERS (customer_name, customer_email, mobile, password, email_verified) VALUES (?, ?, ?, ?, 1)",
        ["Test User", customer_email, "9999988888", await bcrypt.hash("test1234", 10)]
      );
      customer_id = result.insertId;
    } else {
      customer_id = existingCustomer[0].customer_id;
    }

    const token = jwt.sign(
      { customer_id, customer_email, mobile: "9999988888" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful with test credentials",
      token,
      id: customer_id,
      new_user: existingCustomer.length === 0,
    });
  }

  // Find customer by email
  const customers = await db(
    "SELECT * FROM CUSTOMERS WHERE customer_email = ?",
    [customer_email]
  );

  if (customers.length === 0) {
    return next(new AppError("Invalid email or password", 401));
  }

  const customer = customers[0];

  // Check if email is verified
  if (!customer.email_verified) {
    return res.status(403).json({
      success: false,
      message: "Please verify your email first",
      requiresVerification: true,
      email: customer_email,
    });
  }

  // Verify password
  if (!customer.password) {
    return next(new AppError("This account doesn't have a password set. Please sign up again.", 401));
  }

  const isMatch = await bcrypt.compare(password, customer.password);
  if (!isMatch) {
    return next(new AppError("Invalid email or password", 401));
  }

  // Generate JWT
  const token = jwt.sign(
    { customer_id: customer.customer_id, customer_email: customer.customer_email, mobile: customer.mobile },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    id: customer.customer_id,
    new_user: false,
  });
});

// ============================================================
// PROTECT middleware — JWT auth check
// ============================================================
exports.protect = catchAsyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }
  console.log("Decoded Token:", decoded);

  // Support both old tokens (with mobile) and new tokens (with customer_id)
  let searchResult;
  if (decoded.customer_id) {
    searchResult = await db("SELECT * FROM CUSTOMERS WHERE customer_id = ?", [decoded.customer_id]);
  } else if (decoded.mobile) {
    searchResult = await db("SELECT * FROM CUSTOMERS WHERE mobile = ?", [decoded.mobile]);
  } else {
    return next(new AppError("Invalid token payload", 401));
  }

  const currentUser = searchResult[0];

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401),
    );
  }

  req.user = currentUser;
  next();
});
