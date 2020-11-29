import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets } from '../actions/ticketAction'
import EditTicketPopup from './EditTicketPopup'
import TicketTable from './TicketTable'
import * as mui from '@material-ui/core';

const Ticket = ({ disabled, currentEmployeeRole }) => {
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
                    {/* if user is submitter permit to add ticket (remove disabled boolean) */}
                    {currentEmployeeRole === 4 ?
                        <mui.Button variant='contained' type='click'>Add Ticket</mui.Button>
                        :
                        <mui.Button variant='contained' disabled={disabled} type='click'>Add Ticket</mui.Button>
                    }
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