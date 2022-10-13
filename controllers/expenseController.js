if (process.env.NODE_ENV !== `production`) {
    require('dotenv').config()
}


const { User, Expense, Category, sequelize } = require(`../models`)
const pdfService = require(`../helpers/pdfservice`)

class expenseController {

    static async myExpenses(req, res, next) {
        try {
            let UserId = req.user.id

            let myExpenses = await Expense.findAll({
                where: {
                    UserId
                },
                order: [
                    [`createdAt`, `DESC`]
                ],
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
        } catch (error) {
            next(error)
        }
    }

    static PDFReports(req, res, next) {
        // console.log(req.query)

        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=XPense-premium-invoice.pdf`,
        });
        pdfService.buildPDF(
            (chunk) => stream.write(chunk),
            () => stream.end()
        );
    }

    static async pieChart(req, res, next) {
        //! butuh array of numbers isinya 5 (category yg di sum)

        // data = {
        //     labels: [catName1, catName2],
        //     data: [10, 11]
        //     }

        try {
            let UserId = req.user.id

            let raw = await Expense.findAll({
                where: {
                    UserId
                },
                include: {
                    model: Category
                }
            })

            let obj = {}

            raw.forEach(el => {
                if (!obj[el.Category.name]) {
                    obj[el.Category.name] = 0
                }

                obj[el.Category.name] += el.amount
            })

            const formattedData = {
                labels: [],
                data: []
            }

            for (const key in obj) {
                formattedData.labels.push(key)
                formattedData.data.push(obj[key])
            }

            //! ARRAY
            // let labels = []

            // let data = []

            // raw.forEach(el => {
            //     labels.push(el.Category.name)
            //     data.push(el.amount)
            //     return el
            // })

            // let formattedData = {
            //     labels,
            //     data
            // }

            // {
            //     "labels": [
            //         "Food delivery",
            //         "Bills",
            //         "Bills",
            //         "Groceries",
            //         "Transportation",
            //         "Bills",
            //         "Bills",
            //         "Transportation",
            //         "Bills",
            //         "Groceries",
            //         "Groceries"
            //     ],
            //     "data": [
            //         550000,
            //         200000,
            //         10000,
            //         400000,
            //         30000,
            //         550000,
            //         300000,
            //         35000,
            //         50000,
            //         10000,
            //         1
            //     ]
            // }

            // res.status(200).json(obj)
            res.status(200).json(formattedData)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


}

module.exports = expenseController