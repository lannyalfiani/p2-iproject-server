const { User, Expense, Category } = require(`../models`)
const pdfService = require(`../helpers/pdfservice`)

class expenseController {

    static async myExpenses(req, res, next) {
        // console.log(req.user);
        // { id: 1, email: 'user@gmail.com', status: 'regular' }
        try {
            let UserId = req.user.id

            let myExpenses = await Expense.findAll({
                where: {
                    UserId
                },
                attributes: {
                    exclude: [`createdAt`, `updatedAt`, `CategoryId`]
                },
                include: {
                    model: Category,
                    attributes: {
                        exclude: [`createdAt`, `updatedAt`]
                    }
                }
            })
            res.status(200).json(myExpenses)
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    static async addExpenses(req, res, next) {
        try {
            let UserId = req.user.id
            let { name,
                amount,
                date,
                CategoryId } = req.body

            let newExpense = await Expense.create({
                name,
                amount,
                date,
                CategoryId,
                UserId
            })
            res.status(200).json({
                id: newExpense.id,
                name: newExpense.name
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteMyExpense(req, res, next) {
        try {
            await Expense.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({ message: `Success deleting expense from your expenses` })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async updateMyExpense(req, res, next) {
        try {
            await Expense.update({
                name: req.body.name,
                amount: req.body.amount,
                date: req.body.date,
                CategoryId: req.body.CategoryId,
                UserId: req.user.id
            }, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({ message: `Success updating your expense` })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async fetchCategories(req, res, next) {
        try {
            let categories = await Category.findAll({
                attributes: {
                    exclude: [`createdAt`, `updatedAt`]
                }
            })
            res.status(200).json(categories)

        } catch (err) {
            next(err)
        }
    }

    static PDFReports(req, res, next) {
        // const stream = res.status(200, {
        //     'Content-Type': 'application/pdf',
        //     'Content-Disposition': 'attachment;filename=report.pdf'
        // })

        // pdfService.buildPDF(
        //     (chunk) => stream.write(chunk),
        //     () => stream.end()
        // )
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=invoice.pdf`,
        });
        pdfService.buildPDF(
            (chunk) => stream.write(chunk),
            () => stream.end()
        );
    }

}

module.exports = expenseController