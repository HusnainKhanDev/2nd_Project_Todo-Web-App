const nodemailer = require("nodemailer");

// Create a transporter for sending emails
let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., Gmail)
    auth: {
        user: 'hasnainkhan6106@gmail.com',  // Your email address
        pass: 'vvbx hegh ckae imih'    // Your email password or an app-specific password from 2 step verification 
    }
});

// Email sending function
const sendEmailNotification = async (toEmail) => {
    const mailOptions = {
        from: 'hasnainkhan6106@gmail.com',
        to: toEmail,
        subject: "Todo Expiretion Notification",
        text: "Your some tasks will bw expired in next 24 hours. hurry! check them out"
    };

    try {
        await transporter.sendMail(mailOptions);// sendmail function of nodemailer sends mailOptions which have email useing transporter serveice which we define to use google service  
        console.log("Notification email sent to:", toEmail);
    } catch (error) {
        console.log("Error sending email:", error);
    }
};

module.exports = {
    sendEmailNotification: sendEmailNotification
} 
