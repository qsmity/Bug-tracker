const express = require('express')
const AcessControl = require('accesscontrol')
const { Employee, Project, Ticket } = require('../db/models')
const { asyncHandler, handleValidationErrors } = require('./utils')
const { requireAuth, getUserToken } = require('../auth')
const { check } = require('express-validator')
const { grantsObject, ac } = require('./projects')

const router = express.Router()

const ticketNotFoundError = (id) => {
    const err = new Error(`ticket not found`)
    err.errors = [`ticket with id ${id} does not exist`]
    err.title = 'ticket not found'
    err.status = 404
    return err
}

//get all tickets in db based on role
router.get('/', requireAuth, asyncHandler(async (req, res, next) => {
    //req.user.role is set in the requireAuth middleware
    const role = req.user.role
    const employeeId = req.user.id
    try {
        if (role) {
            //admin, project manager, submitter role which returns a boolean if permission granted
            const permissionAdminSubmitterProjectManager = ac.can(`${role}`).readAny('tickets')

            //get all tickets if admin, submitter, projectmanager role
            let tickets;
            if (permissionAdminSubmitterProjectManager.granted) {
                tickets = await Ticket.findAll({
                    include: [Project],
                    include: [Employee]
                })

                //only get tickets assigned to dev
            } else {
                tickets = await Ticket.findAll({
                    include: [Project],
                    incude: [Employee],
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
            res.status(401)
            const err = new Error('permission denied')
            err.title = 'permission denied'
            err.status = 401
            err.errors = ['role not assigned']
            next(err)
        }
    } catch (e) {
        console.log(e)
    }


}))

// create ticket (admin and submitter)
router.post('/', requireAuth,
    asyncHandler(async (req, res, next) => {

        const role = req.user.role
        const permissionAdmin = ac.can(`${role}`).createAny('tickets')
        const permissionSubmitter = ac.can(`${role}`).createAny('tickets')

        //grab employee id's from employeeIdArray sent to associate employee with project created
        const { name,
            description,
            severityLevel,
            status, 
            type,
            projectId} = req.body
        
        const parsedProjectId = parseInt(projectId, 10)

        let ticket;
        if (permissionAdmin.granted || permissionSubmitter.granted) {
            ticket = await Ticket.create({
                name,
                description,
                severityLevel,
                status,
                type,
                projectId: parsedProjectId
            })

            //add project association to ticket
            const project = await Project.findByPk(projectId)
            ticket.addProject(project)


            res.status(201)
            res.json({ ticket })

        } else {
            const err = new Error('permission denied')
            err.title = 'permission denied'
            err.status = 401
            err.errors = ['role not permitted to create resource']
            next(err)
        }


    }))

//edit ticket (admin - all fields), (dev - status level), (project manager - severity level and employee)
router.put('/:ticketId', requireAuth, asyncHandler(async (req, res, next) => {
    const ticketId = parseInt(req.params.ticketId, 10)
    const role = req.user.role
    const permissionAdmin = ac.can(`${role}`).updateAny('tickets')
    const permissionProjectManager = ac.can(`${role}`).updateAny('tickets')
    const permissionDev = ac.can(`${role}`).updateOwn('tickets')

    //grab employee id's from employeeIdArray sent to associate employee with project created
    const { name, description, severityLevel, status, type, employeeId } = req.body

    const parsedEmployeeId = parseInt(employeeId, 10)
    //find project in db to update

    let ticket;
    try {
        if (permissionAdmin.granted) {
            //not updating project id because ticket is created for one specific proj
            await Ticket.update({ name, description, severityLevel, status, type, employeeId: parsedEmployeeId }, {
                where: {
                    id: ticketId
                }
            }
            )

            ticket = await Ticket.findOne({
                include: [Employee],
                where: {
                    id: ticketId
                }
            })


            res.status(201)
            res.json({ ticket })

            //only update status if dev role
        } else if (permissionDev.granted) {
            await Ticket.update({ status }, {
                where: {
                    id: ticketId
                }
            }
            )

            ticket = await Ticket.findOne({
                include: [Employee],
                where: {
                    id: ticketId
                }
            })

            res.status(201)
            res.json({ ticket })

            // project manager -- update severity level and assigned employee
        } else if (permissionProjectManager.granted) {
            await Ticket.update({ severityLevel, employeeId: parsedEmployeeId }, {
                where: {
                    id: ticketId
                }
            }
            )

            ticket = await Ticket.findOne({
                include: [Employee],
                where: {
                    id: ticketId
                }
            })

            res.status(201)
            res.json({ ticket })
        } else {
            const err = new Error('permission denied')
            err.title = 'permission denied'
            err.status = 401
            err.errors = ['role not permitted to create resource']
            next(err)
        }
    } catch (e) {
        console.log(e);
    }

}))

//delete ticket in db (admin and project manager role only)
router.delete('/:ticketId', requireAuth, asyncHandler(async (req, res, next) => {
    //employeeId will be sent when the admin clicks on the user to update the role with
    const ticketId = parseInt(req.params.ticketId, 10)
    console.log('ticketId inside backend', ticketId)
    //grabbing role from req to verify permissions (admin/project manager)
    const role = req.user.role

    //admin and project manager role which returns a boolean if permission granted
    const permissionAdmin = ac.can(`${role}`).deleteAny('employees')
    const permissionProjectManager = ac.can(`${role}`).updateAny('employees')
    console.log('permissions1', permissionAdmin.granted)

    if (permissionAdmin.granted || permissionProjectManager.granted) {
        //find ticket in db to destroy
        const ticket = await Ticket.findByPk(ticketId)

        //if ticket exit destroy it otherwise throw a not found error
        if (ticket) {
            await ticket.destroy()
            res.json({ message: `Deleted ticket with id of ${ticketId}` })
        } else {
            next(ticketNotFoundError(ticketId))
        }
    } else {
        res.status(401)
        const err = new Error('permission denied')
        err.title = 'permission denied'
        err.status = 401
        err.errors = ['role not permitted to delete resource']
        next(err)
    }

}))



module.exports = router