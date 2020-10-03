import Cookies from 'js-cookie'
import { removeEmployees } from './employeeAction'
import { removeProjects } from './projectAction'
import { removeTickets } from './ticketAction'
export const LOAD_SESSION = 'LOAD_SESSION'   
export const REMOVE_SESSION = 'REMOVE_SESSION' 



//actions
export const loadSession = (user, token) => ({
    type: LOAD_SESSION,
    user, 
    token

})

export const removeSession = () => ({
    type: REMOVE_SESSION
})


//thunks
//getState is also a param after dispatch -- check docs for more info
export const login = ( email, password ) => async (dispatch) => {    
    //build a body for req
    const body = {
        email, 
        password
    }

    
    //make a fetch call to db to login user
    try{
        const res = await fetch('/api/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        
        //grab current token
        const token = Cookies.get('token')

        //logged in user
        const { employee } = await res.json()

        dispatch(loadSession(employee, token))
    } catch (err){
        console.log(err)
        //enventually will push into errors array in store
    }
    
}

export const logout = () => (dispatch) => {
    Cookies.remove('token')
    dispatch(removeSession())
    dispatch(removeEmployees())
    dispatch(removeProjects())
    dispatch(removeTickets())
} 

export const signup = ( name, email, password ) => async (dispatch) => {
    //post req to /users
    //dispatch load session 

    //build a body for req
    const body = {
        name,
        email, 
        password
    }

    
    //make a fetch call to db to login user
    try{
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if(!res.ok){
            throw res
        }
        
        //grab current token
        const token = Cookies.get('token')

        //logged in user
        const { employee } = await res.json()

        dispatch(loadSession(employee, token))
    } catch (err){
        console.log(err)
        //enventually will push into errors array in store
    }

}

