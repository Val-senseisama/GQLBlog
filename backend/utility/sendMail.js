import nodemailer from 'nodemailer';

const sendEmail = async (data) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER, // Your email user
            pass: process.env.EMAIL_PASS, // Your email password
        },
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html,
    };

   let info = await transporter.sendMail(mailOptions);
   console.log("Message sent: %s", info.messageId);
};

export default sendEmail;
