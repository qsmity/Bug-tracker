import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createProject } from '../actions/projectAction'



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
        
    }
    return (
        <div>
            <h1>project form</h1>
            <form onSubmit={addProject}>
                <label htmlFor='name'>Name:</label>
                <input onChange={updateName} name='name' id='name' value={name}/>
                <label htmlFor='description'>Description:</label>
                <input onChange={updateDescription} name='description' id='description' value={description}/>

                <label htmlFor='employee'>Add Employee: </label>
                <select onChange={selectedEmployee} id='employee' name='employee' value={selectedEmployeeId}>
                    <option value='' key={-1}>Select Employee</option>
                    {employeesArray.map(employee => (
                        <option key={employee.id} value={employee.id}>{employee.name}</option>
                        
                    ))
                    }
                </select>

                <button type='submit'>Add</button>
            </form>
        </div>

    )
}

export default AddProjectForm; 