import {
    ADD_TICKET,
    LOAD_TICKETS,
    REMOVE_ONE_TICKET,
    REMOVE_TICKETS,
    UPDATE_TICKET
} from '../actions/ticketAction'

const ticketReducer = (state = {}, action) => {
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case LOAD_TICKETS:
            action.tickets.map(ticket => {
                //convert employee object to just the name to make state shape easier to update
                ticket.Employee = ticket.Employee.name
                return nextState[ticket.id] = ticket
            })
            return nextState
        case REMOVE_TICKETS:
            return {}
        case UPDATE_TICKET:
            const ticketId = action.ticket.id
            //convert ticket Employee object to just be one level deep with the employee name
            action.ticket.Employee = action.ticket.Employee.name
            //find ticket to update
            const ticketToUpdate = nextState[ticketId]
            //replace old ticket with new ticket
            nextState[ticketId] = Object.assign({}, ticketToUpdate, action.ticket)
            console.log('new ticket',action.ticket);
            return nextState
        case REMOVE_ONE_TICKET: 
            nextState = Object.assign({}, {...state})
            delete nextState[action.ticketId]
            return nextState
        case ADD_TICKET:
            nextState = {
                ...state,
                [action.ticket.id]: action.ticket
            }
            return nextState
        default:
            return state
    }

}

export default ticketReducer; 