// //! Cara 1
var nodemailer = require('nodemailer');


"use strict";

// async..await is not allowed in global scope, must use a wrapper
async function main(email, username) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: `gmail`,
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
            user: `lannyalfiani13@gmail.com`, // generated ethereal user
            pass: `egvgiwgumuqzhhbs`, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <hello@mail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Hello ${username} akun anda sudah terbuat</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main

// main().catch(console.error);



// function email() {


//     var transporter = nodemailer.createTransport({
//         // service: 'gmail',
//         host: `mail.protonmail.ch`,
//         auth: {
//             user: `ziterz@proton.me`,
//             pass: `ziterz123`,
//         }
//     }),

//     var mailOptions = {
//         from: `ziterz@proton.me`,
//         to: 'ziterz@proton.me',
//         subject: `test`,
//         text: `masuk ga`
//     },

//      var   transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//             }
//         })
// }

// //! Cara 2
// const transporter = nodemailer.createTransport({
//     // service: 'gmail',
//     host: `mail.protonmail.ch`,
//     // port: 1025,
//     secure: false,
//     auth: {
//         // user: `lannysuryaalfiani@gmail.com`,
//         // pass: `2ESyC*1T$cUS`
//         user: `ziterz@proton.me`,
//         pass: `ziterz123`,
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// })

// const sendEmail = async (email) => {
//     const options = {
//         from: `ziterz@proton.me`,
//         to: 'ziterz@proton.me',
//         subject: `test`,
//         text: `masuk ga`
//     }

//     let result = await transporter.sendMail(options, (err, info) => {
//         if (err) {
//             console.log(err, '<<<<');
//         } else {
//             console.log(`Email sent`);
//         }
//     })
// }

// sendEmail(`lannyalfiani13@gmail.com`)
// module.exports = sendEmail