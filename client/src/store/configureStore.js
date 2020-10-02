import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import employees from '../reducers/employeeReducer'
import session from '../reducers/sessionReducer'
import projects from '../reducers/projectReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    employees,
    projects,
    session
})

const storeEnhancer = composeEnhancers(applyMiddleware(thunk))

const configureStore = (initialState) => {
    return createStore(
        rootReducer,
        initialState,
        storeEnhancer
    )
}

export default configureStore; 