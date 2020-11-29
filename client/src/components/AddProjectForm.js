import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createProject } from '../actions/projectAction'
import * as mui from '@material-ui/core';

const AddProjectForm = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    //subscribe to the employee slice of state for the drop down
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
    const employees = useSelector(state => state.employees)
    const employeesArray = Object.values(employees)

    //handle selectedEmployee change
    const selectedEmployee = (e) => {
        setSelectedEmployeeId(e.target.value)
    }

    //handle submit add project
    const addProject = (e) => {
        e.preventDefault()
        dispatch(createProject(name, description, selectedEmployeeId))
        setName('')
        setDescription('')
    }

    return (
        <div>
            <form className='add-proj-form' onSubmit={addProject}>
                <mui.TextField onChange={updateName} label='Name' id="standard-required" value={name} />
                <mui.TextField onChange={updateDescription} rowsMax={4} label='Description' id='standard-multiline-flexible' value={description} />
                <div className='add-proj-form__add-employee-dropdown'>
                    <mui.InputLabel id="demo-simple-select-label">Add Employee</mui.InputLabel>
                    <mui.Select labelId='id="demo-simple-select-label"' onChange={selectedEmployee} id='employee' value={selectedEmployeeId}>
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

    )
}

export default AddProjectForm; 