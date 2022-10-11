const { compareHashWithPassword } = require("../helpers/bcrypt")
const { signPayloadIntoToken } = require("../helpers/jwt")
const { User } = require(`../models`)


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

}


module.exports = userController