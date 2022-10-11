const { compareHashWithPassword } = require("../helpers/bcrypt")
const { signPayloadIntoToken } = require("../helpers/jwt")
const { User } = require(`../models`)

const axios = require(`axios`)

// const midtransClient = require('midtrans-client')

// let snap = new midtransClient.Snap({
//     isProduction: false,
//     serverKey: 'SB-Mid-server-SC7zBrxrjBP-xWwv1TtMwQC-',
//     clientKey: 'SB-Mid-client-jgPpUBjZXarlGCpk'
// });


class userController {

    static async register(req, res, next) {
        try {
            let {
                username,
                email,
                password,
            } = req.body

            let userData = await User.create({
                username,
                email,
                password,
                status: `regular`
            })
            res.status(201).json({ id: userData.id, email: userData.email })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body

            if (!email || !password) {
                throw { name: `INVALID_INPUT` }
            }

            let userToLogin = await User.findOne({
                where: { email }
            })

            if (!userToLogin) {
                throw { name: `INVALID_USER` }
            }

            let userPassword = compareHashWithPassword(userToLogin.password, password)

            if (!userPassword) {
                throw { name: `INVALID_USER` }
            }

            let payload = {
                id: userToLogin.id,
                email: userToLogin.email,
                status: userToLogin.status
            }

            let access_token = signPayloadIntoToken(payload)
            res.status(200).json({ access_token, userData: payload })

        } catch (error) {
            next(error)
        }
    }

    static snapPayment(req, res, next) {

        const midtransClient = require('midtrans-client');
        // Create Snap API instance
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction: false,
            serverKey: 'SB-Mid-server-SC7zBrxrjBP-xWwv1TtMwQC-'
        });

        let parameter = {
            "transaction_details": {
                "order_id": "Premium account Expense Tracker",
                "gross_amount": 50000
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "first_name": "lanny",
                "last_name": "alfiani",
                "email": "lannyalfiani13@gmail.com",
                "phone": "0851617509033"
            }
        };

        snap.createTransaction(parameter)
            .then((transaction) => {
                let transactionToken = transaction.token;
                console.log('transactionToken:', transactionToken);
            })

        //! udh dapet transactionToken: ee65b28c-4bc4-4cf3-8acd-a67d46787919
    }





}



module.exports = userController



// const Xendit = require('xendit-node');
// const x = new Xendit({
//     secretKey: 'xnd_development_mNhag0qcBB7aatdATALB76WlUAiTPtOBt2iLQvLc9Gx6xnTTUm21b9Dvcy1zg',
// });

// API Key: xnd_development_mNhag0qcBB7aatdATALB76WlUAiTPtOBt2iLQvLc9Gx6xnTTUm21b9Dvcy1zg

// const { VirtualAcc } = x;
// const vaSpecificOptions = {};
// const va = new VirtualAcc(vaSpecificOptions);
//     static async payments(req, res, next) {
//     // console.log(`ok`);
//     // console.log(x);
//     const { Invoice } = x;
//     try {
//         //! pake payment link / invoice
//         const invoiceSpecificOptions = {};
//         const i = new Invoice(invoiceSpecificOptions);

//         const resp = await i.createInvoice(
//             {
//                 externalID: 'premium account',
//                 payerEmail: 'user@gmail.co',
//                 description: 'Purchaseremium account',
//                 amount: 50000,
//                 payment_methods: ["OVO"]
//             }
//         )

//         console.log(resp);
//     } catch (err) {
//         console.log(err);
//         next(err)
//     }
// }