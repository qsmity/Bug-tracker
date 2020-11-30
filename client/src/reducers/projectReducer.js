import {
    ADD_PROJECT,
    LOAD_PROJECTS,
    REMOVE_ONE_PROJECT,
    REMOVE_PROJECTS,
    UPDATE_PROJECT,

} from '../actions/projectAction'


//reducer
const projectReducer = (state = {}, action) => {
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case LOAD_PROJECTS:
            nextState = {}
            action.projects.map(project => {
                return nextState[project.id] = project
            })
            return nextState
        case UPDATE_PROJECT:
            const projectId = action.project.id
            //replace old project with new project
            nextState[projectId] = Object.assign({} , {...action.project})
            return nextState
        case ADD_PROJECT:
            nextState = {
                ...state,
                [action.project.id]: action.project
            }
            return nextState
        case REMOVE_ONE_PROJECT:
            nextState = Object.assign({}, { ...state })
            delete nextState[action.projectId]
            return nextState
        case REMOVE_PROJECTS:
            return {}
        default:
            return state
    }
}

export default projectReducer

