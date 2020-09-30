const express = require('express')
const AcessControl = require('accesscontrol')
const { Employee, Project } = require('../db/models')
const { asyncHandler, handleValidationErrors } = require('./utils')
const { requireAuth, getUserToken } = require('../auth')
const { check } = require('express-validator')


const validateProjectNameAndDescription = [
    check("name")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a name."),
    check("description")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a description"),
    handleValidationErrors,
  ];

//mapping roles based off roleId in db
//1 = admin
//2 = projectManager
//3 = dev
//4 = submitter
let grantsObject = {
    1: {
        tickets: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        projects: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }, 
        employees: {
            'update:any': ['roleId'],
            'read:any': ['*']
        }
    },
    2: {
        tickets: {
            'read:any': ['*'],
            'update:own': ['severityLevel', 'status'],
        },
        projects: {
            'read:own': ['*'],
            'update:own': ['employeeId'],
        }
    },
    3: {
        tickets: {
            'read:own': ['*'],
            'update:own': ['comments', 'status']
        },
        projects: {
            'read:own': ['*'],
        }
    },
    4: {
        tickets: {
            'read:any': ['*'],
            'create:any': ['*']
        },
        projects: {
            'read:any': ['*'],
        }
    }
};

//create new ac instance and set grants for roles
const ac = new AcessControl(grantsObject)

const router = express.Router()

//get all projects in db based on role
router.get('/', requireAuth, asyncHandler(async (req, res, next) => {
    console.log(req.user.role)
    //req.user.role is set in the requireAuth middleware
    const role = req.user.role
    if (role) {
        //admin role or submitter role which returns a boolean if permission granted
        const permissionAdminSubmitter = ac.can(`${role}`).readAny('projects')
        
        console.log(permissionAdminSubmitter.granted)
        //get all projects if admin role
        let projects; 
        if (permissionAdminSubmitter.granted) {
             projects = await Project.findAll()

        //only get projects assigned to (dev, projectManager)
        } else {
             projects = await Project.findAll({
                include: {
                    model: Employee,
                    where: {
                        id: req.user.id
                    }
                },
            })
        }
        if (projects) {
            res.status(200)
            res.json({ projects })
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
router.post('/', 
    validateProjectNameAndDescription,
    requireAuth,
    asyncHandler( async (req, res, next) => {

    const role = req.user.role
    const permissionAdmin = ac.can(`${role}`).createAny('projects')

    const { name, description } = req.body
    if(permissionAdmin.granted){
        const project = await Project.create({ name, description })
        const employees = await Employee.findAll()
        res.status(201)
        res.json({ project, employees })
    } else {
        const err = new Error('permission denied')
        err.title = 'permission denied'
        err.status = 401
        err.errors = ['role not permitted to create resource']
        next(err)
    }


}))


module.exports = {
    projectsRouter: router,
    grantsObject, 
    ac
}