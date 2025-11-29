import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  pool: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  maxConnections: 5,
  maxMessages:Infinity,
});
export const sendStyledEmail = async (
  to: string|string[],
  subject: string,
  htmlContent: string
) => {
  const mailOptions = {
    from: `"Avante Dental Solutions Support" <${process.env.GMAIL_USER}>`,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};
