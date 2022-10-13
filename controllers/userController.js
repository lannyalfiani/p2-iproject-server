const { compareHashWithPassword } = require("../helpers/bcrypt")
const { signPayloadIntoToken } = require("../helpers/jwt")
const { User } = require(`../models`)

const axios = require(`axios`)
const nodemailer = require("../helpers/nodemailer")


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
            nodemailer(email, username)

            res.status(201).json({
                id: userData.id,
                email: userData.email,
                status: userData.status
            })
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

        const midtransClient = require('midtrans-client');

        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.serverKey
        });

        let random = Math.random() * 100

        let parameter = {
            "transaction_details": {
                "order_id": `Premium Expense Tracker-${random}`,
                "gross_amount": 50000
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "first_name": `${req.user.username}`,
                "email": `${req.user.email}`,
            }
        };
        snap.createTransaction(parameter)
            .then((transaction) => {
                let transactionToken = transaction.token;

                res.status(201).json({ transactionToken: transactionToken })
            })
            .catch((error) => {
                next(error)
            })
    }

    static async updatePremium(req, res, next) {
        try {
            let UserId = req.params.id
            console.log(UserId);

            await User.update({ status: `premium` }, {
                where: {
                    id: UserId
                }
            })
            res.status(200).json({ message: `Status updated` })
        } catch (error) {
            next(error)
        }
    }

    static async fetchNews(req, res, next) {
        try {
            let { data } = await axios({
                method: `GET`,
                url: `https://jakpost.vercel.app/api/category/business/economy`
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }





}



module.exports = userController