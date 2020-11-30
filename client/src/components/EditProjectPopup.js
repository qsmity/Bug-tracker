import React, { useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ProjectActions from '../actions/projectAction'
import * as mui from '@material-ui/core';

const EditProjectPopup = ({ hideEditProjectPopup, projectName, projectDescr, projectId, projectEmployeeId }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState(projectName)
    
    const [description, setDescription] = useState(projectDescr)
    const updateDescription = (e) => setDescription(e.target.value)
    
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(projectEmployeeId)
    const selectedEmployee = (e) => setSelectedEmployeeId(e.target.value)
    
    const employees = useSelector(state => state.employees)
    const employeesArray = Object.values(employees)
    const roleId = useSelector(state => state.session.role)
    
    //find the current employee name to populate the name field for users that don't have access to employees for the dropdown in edit projects (submitter and dev)
    const projectsObj = useSelector(state => state.projects)

    // only assign currentEmployeeId if projectId is passed in props to avoid undefined in employee dropdown
    let currentEmployeeNameId
    if(projectId) currentEmployeeNameId = projectsObj[projectId].Employees[0].id
    

    //handle submit 
    const editProject = (e) => {
        e.preventDefault()
        dispatch(ProjectActions.editProject(name, description, selectedEmployeeId, projectId))
        console.log('in popup', name, description, selectedEmployeeId, projectId,)

        //clear inputs after submission
        setName('')
        setDescription('')

        //close modal after submission
        hideEditProjectPopup()
    }

    //handle close click
    const close = (e) => {
        hideEditProjectPopup()
    }

    // only admin can edit projects and assign employees, all other roles are view only (project manager and submitter can see all projects, dev can only see own projects)
    if (roleId === 1) {
        return (
            <div className="edit-overlay">
                <div className='popup'>
                    <div className='component__topbar component__topbar--blue'><h3>Edit Project</h3></div>
                    <form onSubmit={editProject} className='popup__form'>
                        <mui.Button variant='contained' onClick={close} className='edit-project-close'>exit</mui.Button>

                        <mui.TextField disabled id="standard-required" label='Name' defaultValue={name} />
                        <mui.TextField onChange={updateDescription} rowsMax={4} label='description' id='standard-multiline-flexible' value={description} multiline required />

                        <mui.InputLabel id="demo-simple-select-label">Add/Edit Employee</mui.InputLabel>
                        <mui.Select labelId='demo-simple-select-label' onChange={selectedEmployee} id='employee' defaultValue={currentEmployeeNameId ? currentEmployeeNameId : ''} value={selectedEmployeeId}>
                            <mui.MenuItem value='' key={-1}>Select Employee</mui.MenuItem>
                            {/* must hard code in demo employees since they aren't returned from db to protect them from being deleted by an admin */}
                            <mui.MenuItem key={1} value={1}>demo_user_admin</mui.MenuItem>
                            <mui.MenuItem key={2} value={2}>demo_user_projectManager</mui.MenuItem>
                            <mui.MenuItem key={3} value={3}>demo_user_dev</mui.MenuItem>
                            <mui.MenuItem key={4} value={4}>demo_user_submitter</mui.MenuItem>
                            {/* populate the other non demo user employees */}
                            {employeesArray.map(employee => (
                                <mui.MenuItem key={employee.id} value={employee.id}>{employee.name}</mui.MenuItem>
                            ))
                            }
                        </mui.Select>

                        <mui.Button variant='contained' type='submit'>Add/Edit</mui.Button>
                    </form>
                </div>
            </div>
        )

        // read only for other roles
    } else {
        return (
            <div className="edit-overlay">
                <div className='popup'>
                    <div className='component__topbar component__topbar--blue'><h3>Edit Ticket</h3></div>
                    <form className='popup__form'>
                        <mui.Button variant='contained' onClick={close} className='edit-ticket-close'>exit</mui.Button>

                        <mui.TextField disabled id="standard-required" label='Name' defaultValue={name} />
                        <mui.TextField rowsMax={4} disabled label='Description' id='standard-multiline-flexible' value={description} multiline />
                        <mui.TextField disabled id="standard-required" label='Employee' value={currentEmployeeNameId} />
                    </form>
                </div>
            </div>
        )
    }

}

export default EditProjectPopup