const express = require('express')
const { Employee } = require('../db/models')
const { asyncHandler, handleValidationErrors } = require('./utils')
const bcrypt = require('bcryptjs')
const { requireAuth, getUserToken} = require('../auth')
const { check } = require('express-validator')
const router = express.Router()

const validateEmailAndPassword = [
    check("email")
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage("Please provide a valid email."),
    check("password")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a password."),
    handleValidationErrors,
  ];

//login
router.post('/',
    validateEmailAndPassword,
    asyncHandler( async ( req, res, next ) => {

    const { email, password } = req.body
    
    // console.log(name, email, password)
    const employee = await Employee.findOne({
        where: {
            email
        }
    })
    // console.log(employee)

    // const hashedPassword = bycrypt.hashSync(password)
    //password should already by hashed, just updating 
    
    //check if user is found and that the hashed passwords match
    if( employee && employee.validatePassword(password)){

        //get token and set in cookie
        const token = getUserToken(employee);
        res.cookie("token", token);
        //return logged in employee
        res.json({ employee })
    } else {
        //create an error and pass it to error handler
        const err = new Error('login failed')
        err.title = 'login failed'
        err.status = 401
        err.errors = ['The provided credentials were invalid']
        return next(err)
        
    }
}))

module.exports = router