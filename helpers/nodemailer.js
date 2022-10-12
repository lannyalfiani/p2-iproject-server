// //! Cara 1
var nodemailer = require('nodemailer');


"use strict";

async function main(email, username) {

    let transporter = nodemailer.createTransport({
        service: `gmail`,
        auth: {
            user: process.env.user,
            pass: process.env.pass,
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

}

module.exports = main