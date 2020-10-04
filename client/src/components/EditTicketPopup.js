import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editTicket } from '../actions/ticketAction'


const EditTicketPopup = ({ hidePopup, ticketName, ticketDescr, ticketId }) => {
    const dispatch = useDispatch()
    // console.log('inside popup', ticketName, ticketDescr);
    const [name, setName] = useState(ticketName)
    // const updateName = (e) => setName(e.target.value)
    const [description, setDescription] = useState(ticketDescr)
    const updateDescription = (e) => setDescription(e.target.value)
    const [severityLevel, setSeverityLevel] = useState('low')
    const updateSeverityLevel = (e) => setSeverityLevel(e.target.value)
    const [status, setStatus] = useState('work in progress')
    const updateStatus = (e) => setStatus(e.target.value)
    const [type, setType] = useState('bug/error')
    const updateType = (e) => setType(e.target.value)
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
    const selectedEmployee = (e) => setSelectedEmployeeId(e.target.value)
    const employees = useSelector(state => state.employees)
    const employeesArray = Object.values(employees)

    //handle submit 
    const addTicket = (e) => {
        e.preventDefault()
        dispatch(editTicket(name, description, severityLevel, status, type, selectedEmployeeId, ticketId))
        console.log('in popup',name, description, severityLevel, status, type, ticketId, selectedEmployeeId)
        setName('')
        setDescription('')
        hidePopup()
    }

    //handle close click
    const close = (e) => {
        hidePopup()
    }

    return (
        <div className="popup">
            <div className='popup__content'>
                <span onClick={close} className='close'>exit</span>
                <h3>edit ticket pop comp</h3>
                <form onSubmit={addTicket}>
                    <label htmlFor='name'>Name: {ticketName} </label>

                    <label htmlFor='description'>Description: </label>
                    <textarea onChange={updateDescription} name='description' id='description' value={description} />
                    <label htmlFor='severityLevel'>Severity Level: </label>
                    <select id='severityLevel' onChange={updateSeverityLevel} value={severityLevel}>
                        <option value='low'>Low</option>
                        <option value='medium'>Medium</option>
                        <option value='high'>High</option>
                    </select>
                    <label htmlFor='status'>status: </label>
                    <select id='status' onChange={updateStatus} value={status}>
                        <option value='work in progress'>Work In Progress</option>
                        <option value='completed'>Completed</option>
                    </select>
                    <label htmlFor='type'>Type: </label>
                    <select id='type' onChange={updateType} value={type}>
                        <option value='bug/error'>Bug/Error</option>
                        <option value='task'>Task</option>
                    </select>
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
        </div>
    )
}

export default EditTicketPopup