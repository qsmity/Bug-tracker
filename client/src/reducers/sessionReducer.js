import {
    LOAD_SESSION, 
    REMOVE_SESSION
    } from '../actions/sessionAction'
    
    
    //reducer
    const sessionReducer = (state = {}, action) => {
        switch(action.type){
            case LOAD_SESSION: 
                return Object.assign({}, { currentUserId: action.user.id, role: action.user.roleId, authToken: action.token, name: action.user.name , email: action.user.email })
            case REMOVE_SESSION: 
                return {}
            default: 
                return state
        }
    }
    
    export default sessionReducer