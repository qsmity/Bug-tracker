import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets } from '../actions/ticketAction'
import EditTicketPopup from './EditTicketPopup'
import AddTicketPopup from './AddTicketPopup'
import TicketTable from './TicketTable'
import * as mui from '@material-ui/core';

const Ticket = ({ disabled, currentEmployeeRole }) => {
    const dispatch = useDispatch()
    const tickets = useSelector(state => state.tickets)
    const ticketsArray = Object.values(tickets)
    const projects = useSelector(state => state.projects)
    const projectsArray = Object.values(projects)

    //grab ticket name and description for edit button popup
    const [ticketName, setTicketName] = useState('hello')
    const [ticketDescr, setTicketDescr] = useState('goodbye')
    const [ticketId, setTicketId] = useState('')
    const [ticketSeverityLevel, setTicketSeverityLevel] = useState('')
    const [ticketStatus, setTicketStatus] = useState('')
    const [ticketEmployeeId, setTicketEmployeeId] = useState('')

    //hidden state for edit ticket popup
    const [isEditTicketHidden, setIsEditTicketHidden] = useState(true)

    //hidden state for add ticket popup
    const [isAddTicketHidden, setIsAddTicketHidden] = useState(true)

    //edit button will pass necessary ticket info nested in the edit button dataset attribute, onclick
    const hideEditTicketPopup = (ticketNamePopup, ticketDescrPopup, ticketId, ticketSevLvlPopup, ticketStatusPopup, ticketEmployeeIdPopup) => {

        if (isEditTicketHidden === true) {
            setIsEditTicketHidden(false)
            setTicketName(ticketNamePopup)
            setTicketDescr(ticketDescrPopup)
            setTicketId(ticketId)
            setTicketSeverityLevel(ticketSevLvlPopup)
            setTicketStatus(ticketStatusPopup)
            setTicketEmployeeId(ticketEmployeeIdPopup)
        } else {
            setIsEditTicketHidden(true)
        }

    }

    //open and close add ticket popup logic
    const hideAddTicketPopup = () => {
        if (isAddTicketHidden === true) {
            setIsAddTicketHidden(false)
        } else {
            setIsAddTicketHidden(true)
        }

    }

    useEffect(() => {
        dispatch(getTickets())
    }, [])

    if (ticketsArray.length > 0) {
        return (
            <div className='ticket'>
                <div>
                    {/* if user is submitter or admin permit to add ticket (remove disabled boolean) */}
                    {currentEmployeeRole === 4 || currentEmployeeRole === 1 ?
                        <mui.Button variant='contained' onClick={hideAddTicketPopup}>Add Ticket</mui.Button>
                        :
                        <mui.Button variant='contained' disabled={disabled} type='click'>Add Ticket</mui.Button>
                    }
                    <TicketTable hideEditTicketPopup={hideEditTicketPopup} disabled={disabled} ticketsArray={ticketsArray} />
                </div>

                { !isEditTicketHidden ? <EditTicketPopup
                    ticketId={ticketId}
                    ticketName={ticketName}
                    ticketDescr={ticketDescr}
                    ticketSevLvl={ticketSeverityLevel}
                    ticketEmployeeId={ticketEmployeeId}
                    ticketStatus={ticketStatus}
                    hideEditTicketPopup={hideEditTicketPopup} /> : null}

                { !isAddTicketHidden ? <AddTicketPopup projectsArray={projectsArray} hideAddTicketPopup={hideAddTicketPopup} /> : null}
            </div>
        )
    } else {
        return <h1 className='not-found'>No Tickets Available</h1>
    }

}

export default Ticket; 