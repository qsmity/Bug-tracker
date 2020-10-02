import React from 'react'


const TicketTable = ({ ticketsArray, currentEmployeeRole, disabled }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>description</th>
                    <th>severity level</th>
                    <th>status</th>
                    <th>type</th>
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
                    <td><button disabled={disabled} id={ticket.id}>Delete</button></td>
                </tr>
            }
            )}
            </tbody>
        </table>
    )
}

export default TicketTable; 