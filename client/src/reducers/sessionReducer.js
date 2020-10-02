import {
    LOAD_SESSION, 
    REMOVE_SESSION
    } from '../actions/sessionAction'
    
    
    //reducer
    const sessionReducer = (state = {}, action) => {
        switch(action.type){
            case LOAD_SESSION: 
                return Object.assign({}, { currentUserId: action.user.id, role: action.user.roleId, authToken: action.token })
            case REMOVE_SESSION: 
                return {}
            default: 
                return state
        }
    }
    
    export default sessionReducer