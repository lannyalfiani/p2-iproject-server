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
                id: userToLogin.id,  //! udah kasih id ke client
                username: userToLogin.username,
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

        let userId = req.user.id //! buat trx id ke midtrans

        // console.log(req.user); // { id: 1, email: 'user@gmail.com', status: 'regular', username: 'user' }

        const midtransClient = require('midtrans-client');
        // Create Snap API instance
        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: 'SB-Mid-server-SC7zBrxrjBP-xWwv1TtMwQC-'
        });

        let parameter = {
            "transaction_details": {
                "order_id": `Premium Expense Tracker-107`,
                // "order_id": `Premium account-user-${userId}`,
                "gross_amount": 50000
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "first_name": `${req.user.username}`,
                // "last_name": "alfiani",
                "email": `${req.user.email}`,
                // "phone": "0851617509033"
            }
        };
        snap.createTransaction(parameter)
            .then((transaction) => {
                let transactionToken = transaction.token;
                console.log('transactionToken:', transactionToken);

                //! trx token buat client
                res.status(201).json({ transactionToken: transactionToken })
            })
            .catch((err) => {
                console.log(err.ApiResponse);
                next(err)
            })
    }



    static async updatePremium(req, res, next) {
        try {
            let UserId = req.params.id
            console.log(UserId);

            //! update user status to premium
            //? Sequelize update status where user id segini
            await User.update({ status: `premium` }, {
                where: {
                    id: UserId
                }
            })
            res.status(200).json({ message: `Status updated` })
        } catch (err) {
            next(err)
        }
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