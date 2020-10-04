import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import employees from '../reducers/employeeReducer'
import session from '../reducers/sessionReducer'
import projects from '../reducers/projectReducer'
import tickets from '../reducers/ticketReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    employees,
    projects,
    tickets,
    session
})

const storeEnhancer = composeEnhancers(applyMiddleware(thunk))

const configureStore = (preloadedState) => {
    return createStore(
        rootReducer,
        preloadedState,
        storeEnhancer
    )
}

export default configureStore; 