const { validationResult } = require('express-validator')

const asyncHandler = (handler) => ( req, res, next ) => handler( req, res, next ).catch(next)

const handleValidationErrors = ( (req, res, next) => {
    const validationErrors = validationResult(req)

    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array().map( err => err.msg )

        const err = new Error('Bad Request')
        err.title = 'Bad Request'
        err.status = 400
        err.errors = errors
        return next(err)
    }
    //if not errors move on to next middleware
    next()

})
module.exports = {
    asyncHandler,
    handleValidationErrors
}