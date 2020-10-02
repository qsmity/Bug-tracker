import {
LOAD_EMPLOYEES, 
REMOVE_EMPLOYEES,
REMOVE_ONE_EMPLOYEE
} from '../actions/employeeAction'


//reducer
const employeeReducer = (state = {}, action) => {
    let nextState;
    switch(action.type){
        case LOAD_EMPLOYEES: 
            nextState = {}
            action.employees.map( employee => {
               return nextState[employee.id] = employee
            })
            return nextState
        case REMOVE_EMPLOYEES: 
            return {}
        case REMOVE_ONE_EMPLOYEE: 
            nextState = Object.assign({}, {...state})
            delete nextState[action.employeeId]
            return nextState
        default: 
            return state
    }
}

export default employeeReducer

