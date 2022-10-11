const express = require('express')
const router = express.Router()
const expenseRouter = require(`../routes/expense`)
const userController = require('../controllers/userController')
const authentication = require(`../middlewares/authentication.js`)
const expenseController = require('../controllers/expenseController')

router.get('/', (req, res, next) => {
    res.status(200).json({ message: `Server Up!` })
})



router.post(`/register`, userController.register)
router.post(`/login`, userController.login)

router.use(authentication)

router.get(`/categories`, expenseController.fetchCategories)

router.use(`/expenses`, expenseRouter)

router.post(`/payments`, userController.snapPayment)

router.patch(`/premium/:id`, userController.updatePremium)





module.exports = router
