export const LOAD_TICKETS = 'LOAD_TICKETS'

//actions
const loadTickets = (tickets) => ({
    type: LOAD_TICKETS,
    tickets
})

export const getTickets = () => async (dispatch) => {
    try {
        const res = await fetch('/api/tickets')

        if(!res.ok){    
            throw res
        }
        const { tickets } = await res.json()
        dispatch(loadTickets(tickets))
    } catch (err) {
        console.log(err)
        //enventually will push into errors array in store
    }
} 