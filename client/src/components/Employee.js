import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees } from '../actions/employeeAction'

const Employee = () => {
    const dispatch = useDispatch()
    const employees = useSelector(state => state.employees)
    // console.log(employees);
    useEffect(() => {
        dispatch(getEmployees())
    }, [dispatch])

    return (
        <div>
            <h1>employee component</h1>
            {
                Array.isArray(employees.employees) ? employees.employees.map(employee => (
                    <ul key={employee.id}>
                        <h2>Employee #: {employee.id}</h2>
                        <li>{employee.name}</li>
                        <p>Projects: {employee.Projects.map(project => (
                            <li key={project.id}>{project.name}</li>
                        ))}
                        </p>
                    </ul>
                )) :
                    <h2>no employees available</h2>
            }
        </div>


    )
}

export default Employee;