import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets } from '../actions/ticketAction'
import EditTicketPopup from './EditTicketPopup'
import TicketTable from './TicketTable'


const Ticket = ({ disabled }) => {
    const dispatch = useDispatch()
    const tickets = useSelector(state => state.tickets)
    const ticketsArray = Object.values(tickets)

    //grab ticket name and description for edit button popup
    const [ticketName, setTicketName] = useState('hello')
    const [ticketDescr, setTicketDescr] = useState('goodbye')
    const [ticketId, setTicketId] = useState('')

    //hidden state for edit ticket popup
    const [isHidden, setIsHidden] = useState(true)
    
    //edit button will pass  necessary ticket info nested in the edit button dataset attribute, onclick
    const hidePopup = (ticketNamePopup, ticketDescrPopup, ticketId) => {
        
        if(isHidden === true){
            setIsHidden(false)
            setTicketName(ticketNamePopup)
            setTicketDescr(ticketDescrPopup)
            setTicketId(ticketId)
        } else {
            setIsHidden(true)
        }
        
    }

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    if (ticketsArray.length > 0) {
        return (
            <div className='ticket'>
                <div>
                    <h1>Tickets</h1>
                    <TicketTable hidePopup={hidePopup} disabled={disabled} ticketsArray={ticketsArray} />
                </div>
                { !isHidden ? <EditTicketPopup ticketId={ticketId} ticketName={ticketName} ticketDescr={ticketDescr} hidePopup={hidePopup} /> : null}
            </div>
        )
    } else {
        return <h1>No Tickets available</h1>
    }

}

export default Ticket; 