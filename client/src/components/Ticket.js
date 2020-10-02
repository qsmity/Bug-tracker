import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets } from '../actions/ticketAction'
import TicketTable from './TicketTable'


const Ticket = ({ currentEmployeeRole, disabled }) => {
    const dispatch = useDispatch()
    const tickets = useSelector(state => state.tickets)
    const ticketsArray = Object.values(tickets)

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    if (ticketsArray.length > 0) {
        return (
            <div>
                <h1>Ticket Component</h1>
                <TicketTable disabled={disabled} currentEmployeeRole={currentEmployeeRole} ticketsArray={ticketsArray} />
            </div>
        )
    } else {
        return <h1>No Tickets available</h1>
    }

}

export default Ticket; 