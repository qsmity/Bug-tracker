import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees } from '../actions/employeeAction'
import EmployeeTable from './EmployeeTable'
import { updateEmployeeRole } from '../actions/employeeAction'

const Employee = () => {
    const dispatch = useDispatch()
    const employees = useSelector(state => state.employees)
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
    const [roleToChange, setRoleToChange] = useState('')
    const employeesArray = Object.values(employees)

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
                <h1>employee component</h1>

                <EmployeeTable employeesArray={employeesArray}/>
            <form onSubmit={handleSubmit}>
                <label htmlFor='employee'>Edit Employee Roles: </label>
                <select onChange={selectedEmployee} id='employee' name='employee' value={selectedEmployeeId} required>
                    <option value='' key={-1}>Select Employee</option>
                    {employeesArray.map(employee => (
                        <option key={employee.id} value={employee.id}>{employee.name}</option>
                        
                    ))
                    }
                </select>
                <select onChange={roleChange} id='roles' name='roles' value={roleToChange} required>
                    <option value='' key={-1}>Select Role</option>
                    <option value={0} key={0}>no role</option>
                    <option value={1} key={1}>admin</option>
                    <option value={2} key={2}>project manager</option>
                    <option value={3} key={3}>dev</option>
                    <option value={4} key={4}>submitter</option>
                    
                    
                </select>
                <button type='submit'>Submit</button>
            </form>
                
            </div>
        )
    } else {
        return <h2>no employees available</h2>
    }



}

export default Employee;