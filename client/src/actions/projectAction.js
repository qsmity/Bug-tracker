export const LOAD_PROJECTS = 'LOAD_PROJECTS'
export const ADD_PROJECT = 'ADD_PROJECT'
export const REMOVE_PROJECTS = 'REMOVE_PROJECTS'
export const REMOVE_ONE_PROJECT = 'REMOVE_ONE_PROJECT'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'


//actions
const loadProjects = (projects) => ({
    type: LOAD_PROJECTS,
    projects
})

// important *** commented out add project and update project because I can't seem to get the associations to 
// employees to be return when the project is updated, so the store isn't updating, and return the table not 
//rerendindering witht he updated resuls. The work around is to just call getProjects() again which grabs all projects
//and may be slow if the db size gets larger. Right now it works

// const addProject = (project) => ({
//     type: ADD_PROJECT,
//     project
// })

// export const updateProject = (project) => ({
//     type: UPDATE_PROJECT,
//     project
// })

export const removeOneProject = (projectId) => ({
    type: REMOVE_ONE_PROJECT,
    projectId
})

export const removeProjects = () => ({
    type: REMOVE_PROJECTS
})



//thunks

export const getProjects = () => async (dispatch) => {
    try {
        const res = await fetch('/api/projects')


        const { projects } = await res.json()
        if (projects) {
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

        if (!res.ok) {
            throw res
        }

        const { project } = await res.json()
        console.log('inside getprojects thunks', project)
        // dispatch(AddProject(project))
        //temporary fix read note above
        dispatch(getProjects())
    } catch (err) {
        console.log(err)
        //enventually will push into errors array in store
    }

}

export const editProject = (name, description, employeeId, projectId) => async (dispatch) => {
    const parsedProjectId = parseInt(projectId, 10)

    //manually make employee id array since backend is set up that way until muilti select is added to employee dropdown for projects
    const employeeIdArray = [employeeId]
    const body = {
        name,
        description,
        employeeIdArray,
    }

    try {
        const res = await fetch(`/api/projects/${parsedProjectId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            throw res
        }
        const { project } = await res.json()
        console.log('in proj reducer', project)
        // dispatch(updateProject(project))
        //temporary fix read note above
        dispatch(getProjects())
    } catch (err) {
        console.log(err)
        //enventually will push into errors array in store
    }
}

export const deleteProject = (projectId) => async (dispatch) => {
    const parsedProjectId = parseInt(projectId, 10)
    try {
        const res = await fetch(`/api/projects/${parsedProjectId}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            throw res
        }

        dispatch(removeOneProject(parsedProjectId))
    } catch (err) {
        console.error(err.message)
        //enventually will push into errors array in store
    }
}
