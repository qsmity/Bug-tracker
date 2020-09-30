const express = require('express')
const AcessControl = require('accesscontrol')
const { Employee, Project, Ticket } = require('../db/models')
const { asyncHandler, handleValidationErrors } = require('./utils')
const { requireAuth, getUserToken } = require('../auth')
const { check } = require('express-validator')
const { grantsObject, ac } = require('./projects')

const router = express.Router()

//get all tickets in db based on role
router.get('/', requireAuth, asyncHandler(async (req, res, next) => {
    console.log(req.user.role)
    //req.user.role is set in the requireAuth middleware
    const role = req.user.role
    const employeeId = req.user.id
    if (role) {
        //admin role or submitter role which returns a boolean if permission granted
        const permissionAdminSubmitter = ac.can(`${role}`).readAny('projects')

        console.log(permissionAdminSubmitter.granted)
        //get all tickets if admin role
        let tickets;
        if (permissionAdminSubmitter.granted) {
            tickets = await Ticket.findAll({
                include: [Project]
            })

            //only get tickets assigned to (dev, projectManager)
        } else {
            tickets = await Ticket.findAll({
                include: [Project],
                where: {
                    employeeId
                }
            })
        }
        if (tickets) {
            res.status(200)
            res.json({ tickets })
        } else {
            res.status(404).send('resource not found')
        }
    } else {
        //build functionality for if role is not defined (new user)
        const err = new Error('permission denied')
        err.title = 'permission denied'
        err.status = 401
        err.errors = ['role not assigned']
        next(err)
    }

}))

// create project (admin role)
router.post('/',requireAuth,
    asyncHandler(async (req, res, next) => {

        const role = req.user.role
        const permissionAdmin = ac.can(`${role}`).createAny('projects')

        //grab employee id's from employeeIdArray sent to associate employee with project created
        const { name, description, employeeIdArray } = req.body

        let project;
        if (permissionAdmin.granted) {
            if (!employeeIdArray) {
                project = await Project.create({ name, description })
            } else {
                project = await Project.create({ name, description })

                //map over array to add association for each employee
                employeeIdArray.map(async id => {
                    //find employee in db
                    const employee = await Employee.findByPk(id)
                    //add association to project
                    project.addEmployee(employee)
                })
            }
            res.status(201)
            res.json({ project })

        } else {
            const err = new Error('permission denied')
            err.title = 'permission denied'
            err.status = 401
            err.errors = ['role not permitted to create resource']
            next(err)
        }


    }))

//edit project admin
router.put('/', requireAuth, asyncHandler(async (req, res, next) => {

        const role = req.user.role
        const permissionAdmin = ac.can(`${role}`).updateAny('projects')

        //grab employee id's from employeeIdArray sent to associate employee with project created
        const { name, description, employeeIdArray } = req.body
        
        //find project in db to update
        const project = await Project.findOne({
            where: {
                name
            }
        });

        if (permissionAdmin.granted) {
            if (!employeeIdArray) {
                //update proj in db
                project.update({ name, description })
            } else {
                project.update({ name, description })

                //map over array to add association for each employee
                employeeIdArray.map(async id => {
                    //find employee in db
                    const employee = await Employee.findByPk(id)
                    //update association
                    project.addEmployee(employee)
                })
            }
            res.status(201)
            res.json({ project })

        } else {
            const err = new Error('permission denied')
            err.title = 'permission denied'
            err.status = 401
            err.errors = ['role not permitted to create resource']
            next(err)
        }



    }))


module.exports = router