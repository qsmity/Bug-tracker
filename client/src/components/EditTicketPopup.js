import React, { useState } from 'react'


const EditTicketPopup = ({ hidePopup, ticketName, ticketDescr }) => {
    // console.log('inside popup', ticketName, ticketDescr);
    const [name, setName] = useState('')
    // const updateName = (e) => setName(e.target.value)
    const [description, setDescription] = useState(ticketDescr)
    const updateDescription = (e) => setDescription(e.target.value)
    const [severityLevel, setSeverityLevel] = useState('low')
    const updateSeverityLevel = (e) => setSeverityLevel(e.target.value)
    const [status, setStatus] = useState('work in progress')
    const updateStatus = (e) => setStatus(e.target.value)
    const [type, setType] = useState('bug/error')
    const updateType = (e) => setType(e.target.value)

    //handle submit 
    const addTicket = (e) => {
        e.preventDefault()
        console.log(name, description, severityLevel, status, type)
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
                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default EditTicketPopup