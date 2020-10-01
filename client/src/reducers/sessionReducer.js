import {
    LOAD_SESSION
    } from '../actions/sessionAction'
    
    
    //reducer
    const loginReducer = (state = {}, action) => {
        switch(action.type){
            case LOAD_SESSION: 
                return Object.assign({}, { currentUserId: action.user.id, role: action.user.roleId, authToken: action.token })
            default: 
                return state
        }
    }
    
    export default loginReducer