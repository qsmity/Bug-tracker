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
    const [ticketSeverityLevel, setTicketSeverityLevel] = useState('')
    const [ticketStatus, setTicketStatus] = useState('')
    const [ticketEmployeeId, setTicketEmployeeId] = useState('')

    //hidden state for edit ticket popup
    const [isHidden, setIsHidden] = useState(true)

    //edit button will pass  necessary ticket info nested in the edit button dataset attribute, onclick
    const hidePopup = (ticketNamePopup, ticketDescrPopup, ticketId, ticketSevLvlPopup, ticketStatusPopup, ticketEmployeeIdPopup) => {

        if (isHidden === true) {
            setIsHidden(false)
            setTicketName(ticketNamePopup)
            setTicketDescr(ticketDescrPopup)
            setTicketId(ticketId)
            setTicketSeverityLevel(ticketSevLvlPopup)
            setTicketStatus(ticketStatusPopup)
            setTicketEmployeeId(ticketEmployeeIdPopup)
        } else {
            setIsHidden(true)
        }

    }

    useEffect(() => {
        dispatch(getTickets())
    }, [])

    if (ticketsArray.length > 0) {
        return (
            <div className='ticket'>
                <div>
                    <TicketTable hidePopup={hidePopup} disabled={disabled} ticketsArray={ticketsArray} />
                </div>
                { !isHidden ? <EditTicketPopup
                    ticketId={ticketId}
                    ticketName={ticketName}
                    ticketDescr={ticketDescr}
                    ticketSevLvl={ticketSeverityLevel}
                    ticketEmployeeId={ticketEmployeeId}
                    ticketStatus={ticketStatus}
                    hidePopup={hidePopup} /> : null}
            </div>
        )
    } else {
        return <h1 className='not-found'>No Tickets Available</h1>
    }

}

export default Ticket; 