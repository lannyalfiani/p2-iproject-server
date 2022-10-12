const express = require('express')
const expenseController = require('../controllers/expenseController')
const router = express.Router()
const { deleteExpense, editExpense } = require(`../middlewares/authorization`)



router.get(`/`, expenseController.myExpenses)

router.get(`/pie`, expenseController.pieChart)


router.post(`/`, expenseController.addExpenses)
router.delete(`/:id`, deleteExpense, expenseController.deleteMyExpense)
router.patch(`/:id`, editExpense, expenseController.updateMyExpense)



module.exports = router

