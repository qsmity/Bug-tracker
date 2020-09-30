import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({

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