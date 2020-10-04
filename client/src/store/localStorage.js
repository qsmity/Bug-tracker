const INITIAL_STATE = 'initialState'

//import to wrap all logic in try/catch incase there are issues retrieving or parsing local storage
export const loadState = () => {
    try {
        const stateJSON = localStorage.getItem(INITIAL_STATE)
        //conditional for if state is not persisted in localStorage (ex. new user session)
        if (stateJSON === null) {
            //returning undefined at state will allow the reducers to use it default state shape
            return undefined
        }
        //parse json data
        return JSON.parse(stateJSON)
    } catch (error) {
        console.warn(error)
        //if error return undefined
        return undefined
    }
}

export const saveState = (state) => {
    try {
        //stringify the state shape before setting in local storage
        const stateJSON = JSON.stringify(state)
        localStorage.setItem(INITIAL_STATE, stateJSON)
    } catch (error) {
        console.warn(error)
    }
}