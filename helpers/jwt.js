const jwt = require(`jsonwebtoken`)


const secretKey = process.env.SECRETKEY

const signPayloadIntoToken = (payload) => jwt.sign(payload, secretKey)
const verifyTokenIntoPayload = (token) => jwt.verify(token, secretKey)



module.exports = {
    signPayloadIntoToken,
    verifyTokenIntoPayload
}
