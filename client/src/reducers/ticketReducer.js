import {
    LOAD_TICKETS, 
    REMOVE_TICKETS
} from '../actions/ticketAction'

const ticketReducer = (state = {}, action) => {
    let nextState;
    switch (action.type) {
        case LOAD_TICKETS:
            nextState = {}
            action.tickets.map(ticket => {
                return nextState[ticket.id] = ticket
            })
            return nextState
        case REMOVE_TICKETS:
            return {}
        default:
            return state
    }

}

export default ticketReducer; 