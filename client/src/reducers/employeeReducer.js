import {
LOAD_EMPLOYEES
} from '../actions/employeeAction'


//reducer
const employeeReducer = (state = {}, action) => {
    switch(action.type){
        case LOAD_EMPLOYEES: 
            return { employees: action.employees}
        default: 
            return state
    }
}

export default employeeReducer

