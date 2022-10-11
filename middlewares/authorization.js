const { Expense, Category } = require(`../models`);

async function deleteExpense(req, res, next) {
    try {
        let { id } = req.params
        let UserId = req.user.id

        let theExpense = await Expense.findOne({
            where: {
                id
            }
        })

        if (!theExpense) {
            throw { name: `INVALID_EXPENSE`, id }
        }

        if (theExpense.UserId !== UserId) {
            throw { name: `FORBIDDEN` }
        } else {
            next()
        }
    } catch (error) {
        next(error);
    }
}

async function editExpense(req, res, next) {
    try {
        let { id } = req.params
        let UserId = req.user.id

        let theExpense = await Expense.findOne({
            where: {
                id
            }
        })

        if (!theExpense) {
            throw { name: `INVALID_EXPENSE`, id }
        }

        if (theExpense.UserId !== UserId) {
            throw { name: `FORBIDDEN` }
        } else {
            next()
        }

    } catch (error) {
        next(error);
    }
}


module.exports = { deleteExpense, editExpense }