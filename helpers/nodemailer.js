//! Cara 1
var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'lannysuryaalfiani@gmail.com',
//         pass: '2ESyC*1T$cUS'
//     }
// });

// var mailOptions = {
//     from: 'smaxchangmin@gmail.com',
//     to: 'lannyalfiani13@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

//! Cara 2
const transporter = nodemailer.createTransport({
    service: `gmail`,
    auth: {
        user: `lannysuryaalfiani@gmail.com`,
        pass: `2ESyC*1T$cUS`
    }
})

const sendEmail = (email) => {
    const options = {
        from: `smaxchangmin@gmail.com`,
        to: email,
        subject: `test`,
        text: `masuk ga`
    }

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email sent`);
        }
    })
}

sendEmail(`lannyalfiani13@gmail.com`)