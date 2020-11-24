import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { editEmployee } from '../actions/ticketAction'
import * as mui from '@material-ui/core';

const EditEmployeePopup = ({ hidePopup, ticketName, ticketDescr, ticketId }) => {
    const dispatch = useDispatch()

    const selectedEmployee = (e) => setSelectedEmployeeId(e.target.value)
    const employees = useSelector(state => state.employees)
    const employeesArray = Object.values(employees)
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
    const [roleToChange, setRoleToChange] = useState('')

    //handle submit 
    const addEmployee = (e) => {
        e.preventDefault()
        hidePopup()
    }

    //handle role change 
    const roleChange = (e) => {
        setRoleToChange(e.target.value)
    }

    //handle close click
    const close = (e) => {
        hidePopup()
    }

    return (
        <div className="edit-overlay">
            <div className='popup'>
                <div className='component__topbar component__topbar--blue'><h3>Edit Employee</h3></div>
                <mui.Button variant='contained' onClick={close} className='close'>exit</mui.Button>
                <form className='employee-form' onSubmit={addEmployee}>
                    <mui.InputLabel id="demo-simple-select-label">Employee</mui.InputLabel>
                    <mui.Select labelId='demo-simple-select-label' onChange={selectedEmployee} id='employee' value={selectedEmployeeId} required>
                        <mui.MenuItem value='' key={-1}>Select Employee</mui.MenuItem>
                        {employeesArray.map(employee => (
                            <mui.MenuItem key={employee.id} value={employee.id}>{employee.name}</mui.MenuItem>

                        ))
                        }
                    </mui.Select>
                    <mui.InputLabel id="demo-simple-select-label">Role</mui.InputLabel>
                    <mui.Select labelId="demo-simple-select-label" onChange={roleChange} id='roles' name='roles' value={roleToChange} required>
                        <mui.MenuItem value='' key={-1}>Select Role</mui.MenuItem>
                        <mui.MenuItem value={0} key={0}>no role</mui.MenuItem>
                        <mui.MenuItem value={1} key={1}>admin</mui.MenuItem>
                        <mui.MenuItem value={2} key={2}>project manager</mui.MenuItem>
                        <mui.MenuItem value={3} key={3}>dev</mui.MenuItem>
                        <mui.MenuItem value={4} key={4}>submitter</mui.MenuItem>


                    </mui.Select>
                    <mui.Button variant='contained' type='submit'>Submit</mui.Button>
                </form>
            </div>
        </div>
    )
}

export default EditEmployeePopup