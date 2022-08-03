const { validationResult } = require('express-validator')

// Checks the if there are any validation errors caught using express-validator
exports.checkValidationErrors = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        throw new Error(errors.array().map(({ msg }) => msg).join('.\n'))
}