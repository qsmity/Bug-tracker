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
        const res = await fetch('/projects')

        
        const { projects } = await res.json()
        console.log('inside getprojects thunks', projects)
        dispatch(loadProjects(projects))
    } catch (err) {
        console.log(err)
        //enventually will push into errors array in store
    }
}

export const createProject = (name, description, employeeId) => async (dispatch) => {
    //fetch call to create project for admin only
    //dispatch add project

    const employeeIdArray = [employeeId]

    const body = {
        name,
        description,
        employeeIdArray
    }

    try {
        const res = await fetch('/projects', {
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
        dispatch(addProject(project))
    } catch (err) {
        console.log(err)
        //enventually will push into errors array in store
    }

}
