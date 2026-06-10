const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ============================================================
// SMTP Rate Limiter — Prevents Gmail from blocking us
// ============================================================
// Gmail limits: ~500 emails/day, ~20 emails/second
// We enforce stricter limits to stay safe:
//   - Max 3 emails per email address per 10 minutes (anti-abuse)
//   - Max 100 emails globally per hour (stay under Gmail limits)
//   - Max 5 emails per email address per day

const emailRateMap = new Map(); // key: email → { timestamps: [] }
const globalEmailLog = [];       // all email timestamps

const RATE_LIMITS = {
  PER_EMAIL_WINDOW_MS: 10 * 60 * 1000,  // 10 minutes
  PER_EMAIL_MAX: 3,                       // Max 3 OTPs per email in 10 min
  PER_EMAIL_DAILY_MAX: 5,                 // Max 5 OTPs per email per day
  GLOBAL_WINDOW_MS: 60 * 60 * 1000,      // 1 hour
  GLOBAL_MAX: 100,                        // Max 100 emails per hour globally
};

/**
 * Check if sending an email to this address is allowed by rate limits
 * @param {string} toEmail
 * @returns {{ allowed: boolean, retryAfterMs?: number, reason?: string }}
 */
const checkRateLimit = (toEmail) => {
  const now = Date.now();
  const emailKey = toEmail.toLowerCase().trim();

  // --- Per-email rate limit (10-minute window) ---
  if (!emailRateMap.has(emailKey)) {
    emailRateMap.set(emailKey, { timestamps: [] });
  }
  const emailData = emailRateMap.get(emailKey);

  // Clean old entries outside the 10-minute window
  emailData.timestamps = emailData.timestamps.filter(
    (ts) => now - ts < RATE_LIMITS.PER_EMAIL_WINDOW_MS
  );

  if (emailData.timestamps.length >= RATE_LIMITS.PER_EMAIL_MAX) {
    const oldestInWindow = emailData.timestamps[0];
    const retryAfterMs = RATE_LIMITS.PER_EMAIL_WINDOW_MS - (now - oldestInWindow);
    return {
      allowed: false,
      retryAfterMs,
      reason: `Too many OTP requests for ${emailKey}. Please wait ${Math.ceil(retryAfterMs / 60000)} minute(s) before trying again.`,
    };
  }

  // --- Per-email daily limit ---
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const dailyCount = emailData.timestamps.filter(
    (ts) => ts >= todayStart.getTime()
  ).length;

  if (dailyCount >= RATE_LIMITS.PER_EMAIL_DAILY_MAX) {
    return {
      allowed: false,
      retryAfterMs: null,
      reason: `Daily OTP limit reached for ${emailKey}. Maximum ${RATE_LIMITS.PER_EMAIL_DAILY_MAX} OTPs per day. Please try again tomorrow.`,
    };
  }

  // --- Global rate limit (hourly) ---
  // Clean old entries
  while (globalEmailLog.length > 0 && now - globalEmailLog[0] > RATE_LIMITS.GLOBAL_WINDOW_MS) {
    globalEmailLog.shift();
  }

  if (globalEmailLog.length >= RATE_LIMITS.GLOBAL_MAX) {
    const oldestGlobal = globalEmailLog[0];
    const retryAfterMs = RATE_LIMITS.GLOBAL_WINDOW_MS - (now - oldestGlobal);
    return {
      allowed: false,
      retryAfterMs,
      reason: `Email service is temporarily overloaded. Please try again in ${Math.ceil(retryAfterMs / 60000)} minute(s).`,
    };
  }

  return { allowed: true };
};

/**
 * Record a successful email send for rate limiting
 * @param {string} toEmail
 */
const recordEmailSent = (toEmail) => {
  const now = Date.now();
  const emailKey = toEmail.toLowerCase().trim();

  if (!emailRateMap.has(emailKey)) {
    emailRateMap.set(emailKey, { timestamps: [] });
  }
  emailRateMap.get(emailKey).timestamps.push(now);
  globalEmailLog.push(now);
};

// ============================================================

/**
 * Send OTP email via Gmail SMTP (Nodemailer) — with rate limiting
 * @param {string} toEmail - Recipient email
 * @param {string} otp - 6-digit OTP
 * @param {string} type - 'customer' or 'vendor'
 * @returns {Promise<object>} Nodemailer send result
 */
const sendOTPEmail = async (toEmail, otp, type = "customer") => {
  // ✅ Check rate limit BEFORE sending
  const rateCheck = checkRateLimit(toEmail);
  if (!rateCheck.allowed) {
    console.warn("SMTP Rate limit hit:", rateCheck.reason);
    const err = new Error(rateCheck.reason);
    err.statusCode = 429;
    err.retryAfterMs = rateCheck.retryAfterMs;
    throw err;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Quick Serve" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: "Your Quick Serve Verification Code",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4285F4; font-size: 28px; margin: 0;">Quick Serve</h1>
            <p style="color: #666; font-size: 14px; margin-top: 5px;">${type === "vendor" ? "Vendor" : "Customer"} Email Verification</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); border-radius: 16px; padding: 32px; text-align: center;">
            <p style="color: #333; font-size: 16px; margin: 0 0 8px;">Your verification code is</p>
            
            <div style="background: white; border-radius: 12px; padding: 20px; margin: 16px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #4285F4;">${otp}</span>
            </div>
            
            <p style="color: #888; font-size: 13px; margin: 16px 0 0;">
              This code will expire in <strong>5 minutes</strong>.
            </p>
          </div>
          
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 24px;">
            If you didn't request this code, please ignore this email.
          </p>
        </div>
      `,
    });

    // ✅ Record successful send for rate tracking
    recordEmailSent(toEmail);

    console.log("OTP email sent successfully to:", toEmail, "MessageId:", info.messageId);
    return info;
  } catch (err) {
    console.error("sendOTPEmail exception:", err.message);
    throw err;
  }
};

/**
 * Generate a random 6-digit OTP
 * @returns {string} 6-digit OTP
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = { sendOTPEmail, generateOTP, checkRateLimit };
