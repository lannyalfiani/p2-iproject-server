// //! Cara 1
var nodemailer = require('nodemailer');


"use strict";

async function main(email, username) {
    // let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        service: `gmail`,
        auth: {
            user: `lannyalfiani13@gmail.com`,
            pass: `egvgiwgumuqzhhbs`,
        },
    });

    await transporter.sendMail({
        from: '"XPense 🤑 " <hello@xpense.com>',
        to: email,
        subject: "Welcome Aboard, XPenser",
        text: "Hello!",
        html: `<h2>Hello from Expense!</h2>

        <p>Hi, <b>${username}!</b> Your account has been created!</p>
        <p>Spend wisely, track your XPense!</p>
        <br>
        <p>Regards, </p>
        <a href="https://freeimage.host/"><img width="50" src="https://iili.io/ZKXtYg.png" alt="ZKXtYg.png" border="0"></a>`,
    });
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main