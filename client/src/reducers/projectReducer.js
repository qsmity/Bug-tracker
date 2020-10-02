import {
    ADD_PROJECT,
    LOAD_PROJECTS,
    REMOVE_PROJECTS,

} from '../actions/projectAction'


//reducer
const projectReducer = (state = {}, action) => {
    let nextState;
    switch (action.type) {
        case LOAD_PROJECTS:
            nextState = {}
            action.projects.map(project => {
                return nextState[project.id] = project
            })
            return nextState
        case ADD_PROJECT: 
            nextState = {
                ...state,
                [action.project.id]: action.project
            }
            return nextState
        case REMOVE_PROJECTS: 
            return {}
        default:
            return state
    }
}

export default projectReducer

