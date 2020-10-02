const express = require('express')
const { Employee, Project } = require('../db/models')
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
  router.get('/:employeeId', asyncHandler( async (req, res, next) => {
    const employeeId = req.params.employeeId
    const employee = await Employee.findOne({
        where: {
            id: employeeId
        }
    })
    res.json({ employee })
  }))

//get all users in db for admin role
router.get('/', requireAuth, asyncHandler(async (req, res, next) => {
    const role = req.user.role
    if(!role){
        res.status(401)
        const err = new Error('permission denied')
        err.title = 'permission denied'
        err.status = 401
        err.errors = ['no role defined']
       return next(err)
    }
    const permissionAdmin = ac.can(`${role}`).readAny('employees')
    console.log(permissionAdmin.granted)

    if(permissionAdmin.granted){
        const employees = await Employee.findAll({
            include: [Project]
        })
        if (employees) {
            res.status(200)
            res.json({ employees })
        } else {
    
            res.status(404).send('resource not found')
        }

    } else {
        res.status(401)
        const err = new Error('permission denied')
        err.title = 'permission denied'
        err.status = 401
        err.errors = ['role not permitted to access resource']
        next(err)
    }

}))

//create new unassigned user in the db for admin to assign and set cookie
router.post('/', 
    [check('name')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a name")],
    validateEmailAndPassword,
    asyncHandler( async ( req, res ) => {
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
    const employeeId = parseInt(req.params.employeeId,10)

    //get roleid from body
    const { roleId } = req.body
    let parsedRoleId = parseInt(roleId)
    if(parsedRoleId === 0){
        parsedRoleId = null
    }

    //grabbing role from req to verify permissions (admin)
    const role = req.user.role

    //admin role which returns a boolean if permission granted
    const permissionAdmin = ac.can(`${role}`).updateAny('employees')
    console.log(permissionAdmin.granted)

    if(permissionAdmin.granted){
        const employee = await Employee.findByPk(employeeId)
       
        if(employee){
            const updatedEmployee = await employee.update({ roleId: parsedRoleId })
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

//delete employee in db (admin role only)
router.delete('/:employeeId', requireAuth, asyncHandler( async ( req, res, next ) => {
    //employeeId will be sent when the admin clicks on the user to update the role with
    const employeeId = parseInt(req.params.employeeId,10)
    console.log('employeeId',employeeId)
    //grabbing role from req to verify permissions (admin)
    const role = req.user.role

    //admin role which returns a boolean if permission granted
    const permissionAdmin = ac.can(`${role}`).updateAny('employees')
    console.log(permissionAdmin.granted)

    if(permissionAdmin.granted){
        //find employee in db to destroy
        const employee = await Employee.findByPk(employeeId)
       
        if(employee){
            await employee.destroy()
            res.json({ message: `Deleted employee with id of ${employeeId}` })
        } else {
            next(userNotFoundError(employeeId))
        }
    } else {
        res.status(401)
        const err = new Error('permission denied')
        err.title = 'permission denied'
        err.status = 401
        err.errors = ['role not permitted to update resource']
        next(err)
    }

}))



module.exports = router