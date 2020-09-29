const express = require('express')
const { Employee } = require('../db/models')
const { asyncHandler, handleValidationErrors } = require('./utils')
const bcrypt = require('bcryptjs')
const { Error } = require('sequelize')
const { requireAuth, getUserToken} = require('../auth')
const { check } = require('express-validator')

const router = express.Router()
const userNotFoundError = (id) => {
    const err = new Error(`user not found`)
    err.errors = [`user with id ${id} does not exist`]
    err.title = 'user not found'
    err.status = 404
    return err
}

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

//get all users in db for admin role
router.get('/', 
    validateEmailAndPassword,
    asyncHandler(async (req, res) => {

    const users = await Employee.findAll()
    if (users) {
        res.status(200)
        res.json({ users })
    } else {

        res.status(404).send('resource not found')
    }

}))

//create new unassigned user in the db for admin to assign and set cookie
router.post('/', asyncHandler( async ( req, res ) => {
    const { name , email, password } = req.body
    // console.log(name, email, password)

    const hashedPassword = bycrypt.hashSync(password)
    const employee = await Employee.create({ name, email, hashedPassword })

    //make a jwt token and set it in the cookie so the user can be logged in
    const token = getUserToken(employee);
    res.cookie("token", token);

    res.status(201)
    res.json({ employee })
}))

//update user role in db
router.put('/:employeeId', asyncHandler( async ( req, res, next ) => {
    //this will be sent when the admin clicks on the user to update the role with
    const employeeId = req.params.employeeId

    //the req should automatically send the already created user info to update
    const { name , email, hashedPassword } = req.body
    //will set up roleId functionality later
    const roleId = 3
    // console.log(name, email, password)
    const employee = await Employee.findByPk(employeeId)
    console.log(employee)

    // const hashedPassword = bycrypt.hashSync(password)
    //password should already by hashed, just updating 
    if(employee){
        const updatedEmployee = await employee.update({ name, email, hashedPassword, roleId })
        res.json({ updatedEmployee })
    } else {
        next(userNotFoundError(userId))
    }
    // res.status(201)
}))


module.exports = router