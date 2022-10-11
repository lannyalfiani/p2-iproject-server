const { User } = require(`../models`)
const { verifyTokenIntoPayload } = require(`../helpers/jwt`)

async function authentication(req, res, next) {
    try {
        let access_token = req.headers.access_token
        // console.log(access_token);

        if (!access_token) {
            throw { name: `Invalid token` }
        }

        let payload = verifyTokenIntoPayload(access_token)

        let user = await User.findByPk(payload.id)

        if (!user) {
            throw { name: `Not logged in` }
        }

        req.user = {
            id: user.id,
            email: user.email,
            status: user.status,
        }
        next()
    } catch (error) {
        next(error)
    }


}

module.exports = authentication