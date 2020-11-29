import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles";
import { createProject } from '../actions/projectAction'
import * as mui from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AddProjectPopup = ({ hidePopup }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    //subscribing to project to force re-render after project added/edited
    const projects = useSelector(state => state.projects)

    //subscribe to the employee slice of state for the drop down
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
    const employees = useSelector(state => state.employees)
    const employeesArray = Object.values(employees) 
    const selectedEmployee = (e) => setSelectedEmployeeId(e.target.value)

    // handle submit 
    const addProject = (e) => {
        e.preventDefault()
        dispatch(createProject(name, description, selectedEmployeeId))
        hidePopup()
    }

    // handle close click
    const close = (e) => {
        hidePopup()
    }

    //re-render when new project added or edited
    //is a workaround for employees not being returned properly when queried after project created
    //add project is dispatching getAllProducts action when it should be dispatching add on project
    useEffect( () => {

    }, [projects])

    return (
        <div className="edit-overlay">
            <div className="popup">
                <div className="component__topbar component__topbar--blue"><h3>Add Project</h3></div>
                <mui.Button variant="contained" onClick={close} className="add-proj-close-button">exit</mui.Button>
                <form className='add-proj-form' onSubmit={addProject}>
                    <mui.TextField onChange={updateName} label='Name' id="standard-required" value={name} required/>
                    <mui.TextField onChange={updateDescription} rowsMax={4} label='Description' id='standard-multiline-flexible' value={description} multiline required/>
                    <div className='add-proj-form__add-employee-dropdown'>
                        <mui.InputLabel id="demo-simple-select-label">Add Employee</mui.InputLabel>
                        <mui.Select labelId='id="demo-simple-select-label"' onChange={selectedEmployee} id='employee' value={selectedEmployeeId} required>
                            <mui.MenuItem value='' key={-1}>Select Employee</mui.MenuItem>
                            {employeesArray.map(employee => (
                                <mui.MenuItem key={employee.id} value={employee.id}>{employee.name}</mui.MenuItem>

                            ))
                            }
                        </mui.Select>
                    </div>
                    <div>
                        <mui.Button variant='contained' type='submit'>Add</mui.Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProjectPopup