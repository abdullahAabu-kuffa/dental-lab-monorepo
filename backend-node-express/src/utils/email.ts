import nodemailer from "nodemailer";

export const sendStyledEmail = async (to: string,subject: string,htmlContent: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Avante Dental Solutions Support" <${process.env.GMAIL_USER}>`,
        to: to,
        subject:subject,
        html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
};
