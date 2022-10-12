const express = require('express')
const app = express()
const port = 3000
const cors = require(`cors`)
const router = require(`./routes`)
const errorHandler = require(`./middlewares/errorhandler`)

// const { User, Expense, Category, sequelize } = require(`./models`)


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(`/`, router)

// //! Draft mulai dari sini
// app.get(`/summary`, (req, res, next) => {
//     try {


//         let data = Expense.findAll({
//             order: sequelize.col('amount'),
//         })

//         res.status(200).json(data)
//     } catch (err) {
//         next(err)
//     }
// })





app.use(errorHandler)







app.listen(port, () => {
    console.log(`Expense tracker listening on port ${port}`)
})

module.exports = app