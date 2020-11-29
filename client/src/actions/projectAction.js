export const LOAD_PROJECTS = 'LOAD_PROJECTS'
export const ADD_PROJECT = 'ADD_PROJECT'
export const REMOVE_PROJECTS = 'REMOVE_PROJECTS'


//actions
const loadProjects = (projects) => ({
    type: LOAD_PROJECTS,
    projects
})

const addProject = (project) => ({
    type: ADD_PROJECT,
    project
})

export const removeProjects = () => ({
    type: REMOVE_PROJECTS
})



//thunks

export const getProjects = () => async (dispatch) => {
    try {
        const res = await fetch('/api/projects')

        
        const { projects } = await res.json()
        if(projects){
            dispatch(loadProjects(projects))
        }
        return 
    } catch (err) {
        console.log(err)
        //enventually will push into errors array in store
    }
}

export const createProject = (name, description, employeeId) => async (dispatch) => {
    //manually making array. git rid of this when multi select created for form
    const employeeIdArray = [employeeId]

    const body = {
        name,
        description,
        employeeIdArray
    }

    try {
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if(!res.ok){
            throw res
        }

        const { project } = await res.json()
        console.log('inside getprojects thunks', project)
        dispatch(getProjects())
    } catch (err) {
        console.log(err)
        //enventually will push into errors array in store
    }

}
