import React from 'react'



const TicketTable = ({ ticketsArray, disabled, hidePopup}) => {
    console.log('ticketsArray inside ticket table', ticketsArray)
    //handle edit click
    const editTicket = (e) => {
        // console.log(e.target.dataset.name)
        // console.log(e.target.dataset.descr)
        hidePopup(e.target.dataset.name, e.target.dataset.descr, e.target.id)
    }
    
    return (
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>description</th>
                    <th>severity level</th>
                    <th>status</th>
                    <th>type</th>
                    <th>assigned employee</th>
                </tr>
            </thead>
            <tbody>
            {ticketsArray.map(ticket => {
                return <tr key={ticket.id}>
                    <td>
                        {ticket.name}
                    </td>
                    <td>{ticket.description}</td>
                    <td>{ticket.severityLevel}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.type}</td>
                    <td>{ticket.Employee}</td>
                    <td><button disabled={disabled} id={ticket.id}>Delete</button></td>
                    <td><button onClick={editTicket} disabled={disabled} id={ticket.id} data-name={ticket.name} data-descr={ticket.description}>Edit</button></td>
                </tr>
            }
            )}
            </tbody>
        </table>
    )
}

export default TicketTable; 