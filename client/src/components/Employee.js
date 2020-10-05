import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees } from '../actions/employeeAction'
import { updateEmployeeRole } from '../actions/employeeAction'
import EmployeeTable2 from './EmployeeTable2'
import * as mui from '@material-ui/core';


const Employee = ({employeesArray}) => {
    const dispatch = useDispatch()
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
    const [roleToChange, setRoleToChange] = useState('')

    useEffect(() => {
        dispatch(getEmployees())
    }, [dispatch])

    //hanldle selected employee
    const selectedEmployee = (e) => {
        setSelectedEmployeeId(e.target.value)
    }

    //handle role change 
    const roleChange = (e) => {
        setRoleToChange(e.target.value)
    }
    // console.log('selectedEmployeeId', selectedEmployeeId)
    // console.log('roleToChange', roleToChange)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateEmployeeRole(selectedEmployeeId, roleToChange))
    }

    // console.log(Object.values(employees))
    if (employeesArray.length > 0) {
        return (
            <div>
                <EmployeeTable2  employeesArray={employeesArray}/>
            <form className='employee-form' onSubmit={handleSubmit}>
                <div className='employee-form__title'>Edit Employee Roles</div>
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
        )
    } else {
        return <h1>N/A</h1>
    }



}

export default Employee;