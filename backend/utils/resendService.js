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

/**
 * Send OTP email via Gmail SMTP (Nodemailer)
 * @param {string} toEmail - Recipient email
 * @param {string} otp - 6-digit OTP
 * @param {string} type - 'customer' or 'vendor'
 * @returns {Promise<object>} Nodemailer send result
 */
const sendOTPEmail = async (toEmail, otp, type = "customer") => {
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

module.exports = { sendOTPEmail, generateOTP };
