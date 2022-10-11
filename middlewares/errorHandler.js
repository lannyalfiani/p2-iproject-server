function errorHandler(err, req, res, next) {
    // console.log(err + `<<<< error handler`);
    let code = 500
    let message = `Internal server error`

    if (err.name === "SequelizeValidationError" || err.name === `SequelizeDatabaseError` || err.name === `SequelizeUniqueConstraintError`) {
        // code = 400
        // message = err.errors[0].message
        code = 400;
        message = err.errors.map((el) => {
            return el.message;
        });
    } else if (err.name === `JsonWebTokenError`) {
        code = 401
        message = `Please log in to access`
    } else if (err.name === `INVALID_INPUT`) {
        code = 400
        message = `Email or password is required!`
    } else if (err.name === `INVALID_USER`) {
        code = 401;
        message = `Invalid email or password`;
    } else if (err.name === `CATEGORY_EXISTS`) {
        code = 409;
        message = `Category ${err.input} already exists`;
    } else if (err.name === `INVALID_CATEGORY`) {
        code = 404
        message = `Category doesn't exist`
    } else if (err.name === `INVALID_EXPENSE`) {
        code = 404
        message = `Expense id ${err.id} doesn't exist`
    } else if (err.name === `FORBIDDEN`) {
        code = 403
        message = `You are not authorized to do this action`
    }

    res.status(code).json({ message })
}

module.exports = errorHandler