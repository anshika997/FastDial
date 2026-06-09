const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (options) => {
  const mailOptions = {
    from: `"Quick Serve" <${process.env.SMTP_USER}>`,
    ...options,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;