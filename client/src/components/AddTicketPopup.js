import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createTicket } from '../actions/ticketAction'
import * as mui from "@material-ui/core";

const AddTicketPopup = ({ hideAddTicketPopup, projectsArray }) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const updateName = (e) => setName(e.target.value)

    const [description, setDescription] = useState('')
    const updateDescription = (e) => setDescription(e.target.value)

    const [severityLevel, setSeverityLevel] = useState('')
    const updateSeverityLevel = (e) => setSeverityLevel(e.target.value)

    const [status, setStatus] = useState('')
    const updateStatus = (e) => setStatus(e.target.value)

    const [type, setType] = useState('bug/error')
    const updateType = (e) => setType(e.target.value)

    const [selectedProjectId, setSelectedProjectId] = useState('')
    const updateSelectedProject = (e) => setSelectedProjectId(e.target.value)

    // handle submit 
    const addTicket = (e) => {
        e.preventDefault()
        dispatch(createTicket(name, description, severityLevel, status, type, selectedProjectId))
        hideAddTicketPopup()
    }

    // handle close click
    const close = (e) => {
        hideAddTicketPopup()
    }

    return (
        <div className="edit-overlay">
            <div className="popup">
                <div className="component__topbar component__topbar--blue"><h3>Add Ticket</h3></div>
                <mui.Button variant="contained" onClick={close} className="add-ticket-close-button">exit</mui.Button>
                <form onSubmit={addTicket} className='add-ticket-popup-form'>
                    <mui.TextField onChange={updateName} id="standard-required" label='Name' value={name} required />
                    <mui.TextField onChange={updateDescription} rowsMax={4} label='description' id='standard-multiline-flexible' value={description} multiline required />

                    <mui.InputLabel id="demo-simple-select-label">Severity Level</mui.InputLabel>
                    <mui.Select labelId="demo-simple-select-label" id='severityLevel' onChange={updateSeverityLevel} value={severityLevel} required>
                        <mui.MenuItem value='low'>Low</mui.MenuItem>
                        <mui.MenuItem value='medium'>Medium</mui.MenuItem>
                        <mui.MenuItem value='high'>High</mui.MenuItem>
                    </mui.Select >

                    <mui.InputLabel id="demo-simple-select-label">Status</mui.InputLabel>
                    <mui.Select labelId="demo-simple-select-label" id='status' onChange={updateStatus} value={status} required>
                        <mui.MenuItem value='work in progress'>Work In Progress</mui.MenuItem>
                        <mui.MenuItem value='completed'>Completed</mui.MenuItem>
                    </mui.Select>

                    <mui.InputLabel id="demo-simple-select-label">Type</mui.InputLabel>
                    <mui.Select labelId='demo-simple-select-label' id='type' onChange={updateType} value={type} required>
                        <mui.MenuItem value='bug/error'>Bug/Error</mui.MenuItem>
                        <mui.MenuItem value='task'>Task</mui.MenuItem>
                    </mui.Select>

                    <mui.InputLabel id="demo-simple-select-label">Assign to Project</mui.InputLabel>
                    <mui.Select labelId='demo-simple-select-label' onChange={updateSelectedProject} id='project' value={selectedProjectId} required>
                        <mui.MenuItem value='' key={-1}>Select Project</mui.MenuItem>
                        {projectsArray ? projectsArray.map(project => (
                            <mui.MenuItem key={project.id} value={project.id}>{project.name}</mui.MenuItem>
                        ))
                        : null
                        }
                    </mui.Select>
                    <mui.Button variant='contained' type='submit'>Add</mui.Button>
                </form>
            </div>
        </div>
    )
}

export default AddTicketPopup