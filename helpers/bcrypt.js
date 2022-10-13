const bcrypt = require('bcryptjs');


const createHashFromPassword = (password) => bcrypt.hashSync(password)
const compareHashWithPassword = (hash, password) => bcrypt.compareSync(password, hash)

module.exports = {
    createHashFromPassword,
    compareHashWithPassword
}