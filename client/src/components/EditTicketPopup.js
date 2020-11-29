import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editTicket } from '../actions/ticketAction'
import * as mui from '@material-ui/core';

const EditTicketPopup = ({ hideEditTicketPopup, ticketName, ticketDescr, ticketId, ticketSevLvl, ticketEmployeeId, ticketStatus }) => {
    const dispatch = useDispatch()

    const [name, setName] = useState(ticketName)

    const [description, setDescription] = useState(ticketDescr)
    const updateDescription = (e) => setDescription(e.target.value)

    const [severityLevel, setSeverityLevel] = useState(ticketSevLvl)
    const updateSeverityLevel = (e) => setSeverityLevel(e.target.value)

    const [status, setStatus] = useState(ticketStatus)
    const updateStatus = (e) => setStatus(e.target.value)

    const [type, setType] = useState('bug/error')
    const updateType = (e) => setType(e.target.value)

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(ticketEmployeeId)
    const selectedEmployee = (e) => setSelectedEmployeeId(e.target.value)

    const employees = useSelector(state => state.employees)
    const employeesArray = Object.values(employees)
    const roleId = useSelector(state => state.session.role)

    //find the current employee name to populate the name field for users that don't have access to employees for the dropdown in edit tickets (submitter and dev)
    const ticketsObj = useSelector(state => state.tickets)
    const currentEmployeeName = ticketsObj[ticketId].Employee

    //handle submit 
    const addTicket = (e) => {
        e.preventDefault()
        dispatch(editTicket(name, description, severityLevel, status, type, selectedEmployeeId, ticketId))
        console.log('in popup', name, description, severityLevel, status, type, ticketId, selectedEmployeeId)
        setName('')
        setDescription('')
        hideEditTicketPopup()
    }

    //handle close click
    const close = (e) => {
        hideEditTicketPopup()
    }

    // if user is project manager only allow to edit employee and severity level
    if (roleId === 2) {
        return (
            <div className="edit-overlay">
                <div className='popup'>
                    <div className='component__topbar component__topbar--blue'><h3>Edit Ticket</h3></div>
                    <form onSubmit={addTicket} className='popup__form'>
                        <mui.Button variant='contained' onClick={close} className='edit-ticket-close'>exit</mui.Button>
                        <mui.TextField disabled id="standard-required" label='Name' defaultValue={ticketName} />
                        <mui.TextField rowsMax={4} disabled label='Description' id='standard-multiline-flexible' value={description} multiline />
                        <mui.TextField rowsMax={4} disabled label='Status' id='standard-multiline-flexible' value={status} />
                        <mui.TextField disabled id="standard-required" label='type' defaultValue={type} />

                        <mui.InputLabel id="demo-simple-select-label">Severity Level</mui.InputLabel>
                        <mui.Select labelId="demo-simple-select-label" id='severityLevel' onChange={updateSeverityLevel} value={severityLevel}>
                            <mui.MenuItem value='low'>Low</mui.MenuItem>
                            <mui.MenuItem value='medium'>Medium</mui.MenuItem>
                            <mui.MenuItem value='high'>High</mui.MenuItem>
                        </mui.Select >

                        <mui.InputLabel id="demo-simple-select-label">Add/Edit Employee</mui.InputLabel>
                        <mui.Select labelId='demo-simple-select-label' onChange={selectedEmployee} id='employee' defaultValue={selectedEmployeeId} value={selectedEmployeeId} required>
                            <mui.MenuItem value='' key={-1}>Select Employee</mui.MenuItem>
                            {employeesArray.map(employee => (
                                <mui.MenuItem key={employee.id} value={employee.id}>{employee.name}</mui.MenuItem>

                            ))
                            }
                        </mui.Select>

                        <mui.Button variant='contained' type='submit'>Add</mui.Button>
                    </form>
                </div>
            </div>
        )

        // if user is submitter no editing allowed, just read only
    } else if (roleId === 4) {
        return (
            <div className="edit-overlay">
                <div className='popup'>
                    <div className='component__topbar component__topbar--blue'><h3>Edit Ticket</h3></div>
                    <form onSubmit={addTicket} className='popup__form'>
                        <mui.Button variant='contained' onClick={close} className='edit-ticket-close'>exit</mui.Button>

                        <mui.TextField disabled id="standard-required" label='Name' defaultValue={ticketName} />
                        <mui.TextField rowsMax={4} disabled label='Description' id='standard-multiline-flexible' value={description} multiline />
                        <mui.TextField rowsMax={4} disabled label='Status' id='standard-multiline-flexible' value={status} />
                        <mui.TextField disabled id="standard-required" label='type' defaultValue={type} />
                        <mui.TextField disabled id="standard-required" label='Severity Level' defaultValue={type} />
                        <mui.TextField disabled id="standard-required" label='Employee' defaultValue={currentEmployeeName} />
                    </form>
                </div>
            </div>
        )

        // if dev only edit status 
    } else if (roleId === 3) {
        return (
            <div className="edit-overlay">
                <div className='popup'>
                    <div className='component__topbar component__topbar--blue'><h3>Edit Ticket</h3></div>
                    <form onSubmit={addTicket} className='popup__form'>
                        <mui.Button variant='contained' onClick={close} className='edit-ticket-close'>exit</mui.Button>

                        <mui.TextField disabled id="standard-required" label='Name' defaultValue={ticketName} />
                        <mui.TextField rowsMax={4} disabled label='Description' id='standard-multiline-flexible' value={description} multiline />
                        <mui.TextField rowsMax={4} disabled label='Status' id='standard-multiline-flexible' value={status} />
                        <mui.TextField disabled id="standard-required" label='type' defaultValue={type} />
                        <mui.TextField disabled id="standard-required" label='Employee' defaultValue={currentEmployeeName} />

                        <mui.InputLabel id="demo-simple-select-label">Status</mui.InputLabel>
                        <mui.Select labelId="demo-simple-select-label" id='status' onChange={updateStatus} value={status}>
                            <mui.MenuItem value='work in progress'>Work In Progress</mui.MenuItem>
                            <mui.MenuItem value='completed'>Completed</mui.MenuItem>
                        </mui.Select>

                        <mui.Button variant='contained' type='submit'>Add</mui.Button>
                    </form>
                </div>
            </div>
        )

        //if admin, edit all fields on ticket
    } else {
        return (
            <div className="edit-overlay">
                <div className='popup'>
                    <div className='component__topbar component__topbar--blue'><h3>Edit Ticket</h3></div>
                    <form onSubmit={addTicket} className='popup__form'>
                        <mui.Button variant='contained' onClick={close} className='edit-ticket-close'>exit</mui.Button>
                        <mui.TextField disabled id="standard-required" label='Name' defaultValue={ticketName} />
                        <mui.TextField onChange={updateDescription} rowsMax={4} disabled label='description' id='standard-multiline-flexible' value={description} multiline />

                        <mui.InputLabel id="demo-simple-select-label">Severity Level</mui.InputLabel>
                        <mui.Select labelId="demo-simple-select-label" id='severityLevel' onChange={updateSeverityLevel} value={severityLevel}>
                            <mui.MenuItem value='low'>Low</mui.MenuItem>
                            <mui.MenuItem value='medium'>Medium</mui.MenuItem>
                            <mui.MenuItem value='high'>High</mui.MenuItem>
                        </mui.Select >

                        <mui.InputLabel id="demo-simple-select-label">Status</mui.InputLabel>
                        <mui.Select labelId="demo-simple-select-label" id='status' onChange={updateStatus} value={status}>
                            <mui.MenuItem value='work in progress'>Work In Progress</mui.MenuItem>
                            <mui.MenuItem value='completed'>Completed</mui.MenuItem>
                        </mui.Select>

                        <mui.InputLabel id="demo-simple-select-label">Type</mui.InputLabel>
                        <mui.Select labelId='demo-simple-select-label' id='type' onChange={updateType} value={type}>
                            <mui.MenuItem value='bug/error'>Bug/Error</mui.MenuItem>
                            <mui.MenuItem value='task'>Task</mui.MenuItem>
                        </mui.Select>

                        <mui.InputLabel id="demo-simple-select-label">Add/Edit Employee</mui.InputLabel>
                        <mui.Select labelId='demo-simple-select-label' onChange={selectedEmployee} id='employee' defaultValue={selectedEmployeeId} value={selectedEmployeeId} required>
                            <mui.MenuItem value='' key={-1}>Select Employee</mui.MenuItem>
                            {employeesArray.map(employee => (
                                <mui.MenuItem key={employee.id} value={employee.id}>{employee.name}</mui.MenuItem>

                            ))
                            }

                        </mui.Select>

                        <mui.Button variant='contained' type='submit'>Add</mui.Button>
                    </form>
                </div>
            </div>
        )

    }

}

export default EditTicketPopup