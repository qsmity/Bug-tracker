import React from 'react'
import { useSelector } from 'react-redux'


const Ticket = () => {
    const tickets = useSelector(state => state.tickets)
    const ticketsArray = Object.values(tickets)
    return (
        <div>
            <h1>Ticket Component</h1>
            {ticketsArray.map(ticket => {
                return <tr key={ticket.id}>
                    <td>
                        {ticket.name}
                    </td>
                    <td>{ticket.description}</td>
                    <td>{ticket.severityLevel}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.type}</td>
                    <td><button id={ticket.id}>Delete</button></td>
                </tr>
            }
            )}
        </div>
    )
}

export default Ticket; 