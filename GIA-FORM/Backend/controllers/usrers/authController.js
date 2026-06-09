// node and express imports
const { promisify } = require("util");

// third party imports
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
// local imports
const db = require("../../database/db");
const AppError = require("../../utils/appError");
const catchAsyncError = require("../../utils/catchAsyncError");
const { sendFast2OTP, VerifyFast2OTP } = require("../../middlewares/fast2sms");
const {
  generateInsertStatement,
} = require("../../database/sqlStatementGenarator");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, req, res) => {
  const accessToken = signToken(user.user_id);

  res.status(statusCode).json({
    accessToken,
    user: {
      empid: user.user_id,
      name: user.user_name,
      phone: user.user_mobile,
    },
  });
};

exports.loginRequest = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res
      .status(403)
      .json({ err: "Please use valid credentials to create account" });
  }

  const searchUserSql = `SELECT * FROM users WHERE email = ? `;
  let searchResult = await db(searchUserSql, email);

  if (searchResult.length === 0) {
    return next(new AppError("Invalid email address", 403));
  }
  let user = searchResult[0];
  let passComp = await bcrypt.compare(password, user.password);
  if (!passComp) {
    return res.status(403).json({ err: "Invalid email or password" });
  }
  createAndSendToken(user, 200, req, res);
});

exports.loginVerify = catchAsyncError(async (req, res, next) => {
  const { phone, otp } = req.body;

  const searchUserSql = `SELECT * FROM otp WHERE mobile = ? ORDER BY created_at DESC`;
  let searchResult = await db(searchUserSql, phone);
  // console.log(searchResult);

  if (searchResult.length === 0) {
    return next(new AppError("Invalid otp or phone", 403));
  }

  let result = searchResult[0];
  const vid = result.vid;

  // if VerifyFast2OTP is successful and verificationStatus is true, send a successful response to the client
  const otpRes = await VerifyFast2OTP(vid, otp);
  if (otpRes) {
    const updateStatement = `UPDATE users SET is_verified = true where user_mobile = ?`;
    await db(updateStatement, phone);
    const searchUserSql = `SELECT * FROM users WHERE user_mobile = ? `;
    let searchResult = await db(searchUserSql, phone);
    const userdetails = searchResult[0];

    return createAndSendToken(userdetails, 200, req, res);
  } else {
    next(new AppError("Invalid OTP", 400));
  }

  // if VerifyFast2OTP is unsuccessful, send an error response to the client
  return next(new AppError("Invalid OTP", 400));
});

exports.signUp = catchAsyncError(async (req, res, next) => {
  const { user_name, user_mobile, email, password } = req.body;
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res
      .status(403)
      .json({ err: "Please use valid credentials to create account" });
  }
  const searchUserSql = `SELECT * FROM users WHERE user_mobile = ? OR email = ?`;
  let searchResult = await db(searchUserSql, [user_mobile, email]);
  if (searchResult.length > 0) {
    return next(new AppError("Number or email already registered", 400));
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(password, salt);
  await generateInsertStatement("users", req);
  res.status(200).json({
    success: "true",
  });
});

exports.protect = catchAsyncError(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const searchUserSql = `SELECT * FROM users WHERE user_id = ? and is_verified = true`;
  const searchResult = await db(searchUserSql, decoded.id);
  const currentUser = searchResult[0];

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.logout = catchAsyncError(async (req, res, next) => {});
