import {
LOAD_EMPLOYEES, 
REMOVE_EMPLOYEES
} from '../actions/employeeAction'


//reducer
const employeeReducer = (state = {}, action) => {
    switch(action.type){
        case LOAD_EMPLOYEES: 
            const nextState = {}
            action.employees.map( employee => {
               return nextState[employee.id] = employee
            })
            return nextState
        case REMOVE_EMPLOYEES: 
            return {}
        default: 
            return state
    }
}

export default employeeReducer

