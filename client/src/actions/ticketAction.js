export const LOAD_TICKETS = 'LOAD_TICKETS'
export const REMOVE_TICKETS = 'REMOVE_TICKETS'
export const REMOVE_ONE_TICKET = 'REMOVE_ONE_TICKET'
export const UPDATE_TICKET = 'UPDATE_TICKET'
export const ADD_TICKET = 'ADD_TICKET'


//actions
const loadTickets = (tickets) => ({
    type: LOAD_TICKETS,
    tickets
})

const updateTicket = (ticket) => ({
    type: UPDATE_TICKET,
    ticket
})

export const removeOneTicket = (ticketId) => ({
    type: REMOVE_ONE_TICKET,
    ticketId
})

export const removeTickets = () => ({
    type: REMOVE_TICKETS
})

const addTicket = (ticket) => ({
    type: ADD_TICKET,
    ticket
})

export const getTickets = () => async (dispatch) => {
    try {
        const res = await fetch('/api/tickets')

        if (!res.ok) {
            throw res
        }
        const { tickets } = await res.json()
        console.log('all tickets', tickets)
        dispatch(loadTickets(tickets))
    } catch (err) {
        console.log(err)
        //enventually will push into errors array in store
    }
}

export const createTicket = (name,
    description,
    severityLevel,
    status,
    type,
    projectId) => async (dispatch) => {

        const body = {
            name,
            description,
            severityLevel,
            status,
            type,
            projectId
        }

        try {
            const res = await fetch('/api/tickets', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            if (!res.ok) {
                throw res
            }

            const { ticket } = await res.json()
            console.log('inside createticket thunk', ticket)
            dispatch(addTicket(ticket))
        } catch (err) {
            console.log(err)
            //enventually will push into errors array in store
        }

    }

export const editTicket = (name, description, severityLevel, status, type, employeeId, ticketId) => async (dispatch) => {
    //manually making array. git rid of this when multi select created for form

    const body = {
        name,
        description,
        severityLevel,
        type,
        status,
        employeeId
    }

    try {
        const res = await fetch(`/api/tickets/${ticketId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            throw res
        }
        const { ticket } = await res.json()
        dispatch(updateTicket(ticket))
    } catch (err) {
        console.log(err)
        //enventually will push into errors array in store
    }
}

export const deleteTicket = (ticketId) => async (dispatch) => {
    const parsedTicketId = parseInt(ticketId, 10)
    try {
        const res = await fetch(`/api/tickets/${parsedTicketId}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            throw res
        }

        dispatch(removeOneTicket(parsedTicketId))
    } catch (err) {
        console.error(err.message)
        //enventually will push into errors array in store
    }
}

