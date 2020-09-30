const express = require('express')
const { Employee } = require('../db/models')
const { asyncHandler, handleValidationErrors } = require('./utils')
const bcrypt = require('bcryptjs')
const { requireAuth, getUserToken} = require('../auth')
const { check } = require('express-validator')
const AcessControl = require('accesscontrol')
const { grantsObject, ac } = require('./projects')


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
router.get('/', requireAuth, asyncHandler(async (req, res, next) => {
    const role = req.user.role

    const permissionAdmin = ac.can(`${role}`).readAny('employees')
    console.log(permissionAdmin.granted)

    if(permissionAdmin.granted){
        const users = await Employee.findAll()
        if (users) {
            res.status(200)
            res.json({ users })
        } else {
    
            res.status(404).send('resource not found')
        }

    } else {
        const err = new Error('permission denied')
        err.title = 'permission denied'
        err.status = 401
        err.errors = ['role not permitted to access resource']
        next(err)
    }

}))

//create new unassigned user in the db for admin to assign and set cookie
router.post('/', asyncHandler( async ( req, res ) => {
    const { name , email, password } = req.body
    // console.log(name, email, password)

    const hashedPassword = bcrypt.hashSync(password)
    const employee = await Employee.create({ name, email, hashedPassword })

    //make a jwt token and set it in the cookie so the user can be logged in
    const token = getUserToken(employee);
    res.cookie("token", token);

    res.status(201)
    res.json({ employee })
}))

//update user role in db (admin role only)
router.put('/:employeeId', requireAuth, asyncHandler( async ( req, res, next ) => {
    //employeeId will be sent when the admin clicks on the user to update the role with
    const employeeId = req.params.employeeId

    const role = req.user.role
    console.log(role)
    //admin role which returns a boolean if permission granted
    const permissionAdmin = ac.can(`${role}`).updateAny('employees')
    console.log(permissionAdmin.granted)

    if(permissionAdmin.granted){
        //the req should automatically send the already created user info to update
        // const { name , email, hashedPassword } = req.body
    
        //testing purposes for postman
        const { name , email, password} = req.body
        const hashedPassword = bcrypt.hashSync(password)
    
        //will set up roleId functionality later
        const roleId = 3

        // console.log(name, email, password)

        const employee = await Employee.findByPk(employeeId)
        // console.log(employee)
        
    
        //password should already be hashed, just updating 
        if(employee){
            const updatedEmployee = await employee.update({ name, email, hashedPassword, roleId })
            res.json({ updatedEmployee })
        } else {
            next(userNotFoundError(employeeId))
        }
    } else {
        const err = new Error('permission denied')
        err.title = 'permission denied'
        err.status = 401
        err.errors = ['role not permitted to update resource']
        next(err)
    }

}))


module.exports = router