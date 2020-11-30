import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../actions/projectAction'
import AddProjectPopup from './AddProjectPopup'
import EditProjectPopup from './EditProjectPopup'
import ProjectTable from './ProjectTable'
import * as mui from '@material-ui/core';



const Project = ({ disabled }) => {
    const dispatch = useDispatch()
    const projects = useSelector(state => state.projects)
    const projectsArray = Object.values(projects)
    const [isAddProjectHidden, setIsAddProjectHidden] = useState(true)
    const [isEditProjectHidden, setIsEditProjectHidden] = useState(true)

     //grab project name and description for edit button popup
     const [projectName, setProjectName] = useState('')
     const [projectDescr, setProjectDescr] = useState('')
     const [projectId, setProjectId] = useState('')
     const [projectEmployeeId, setProjectEmployeeId] = useState('')


    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    //open and close add project modal logic
    const hideAddProjectPopup = () => {
        if (isAddProjectHidden === true) {
            setIsAddProjectHidden(false)
        } else {
            setIsAddProjectHidden(true)
        }
    }

    //open and close edit project modal logic
    //edit button will pass necessary project info nested in the edit button dataset attribute, onclick
    const hideEditProjectPopup = (projectNamePopup, projectDescrPopup, projectEmployeeIdPopup, projectId) => {
        if (isEditProjectHidden === true) {
            setIsEditProjectHidden(false)
            setProjectName(projectNamePopup)
            setProjectDescr(projectDescrPopup)
            setProjectId(projectId)
            setProjectEmployeeId(projectEmployeeIdPopup)
        } else {
            setIsEditProjectHidden(true)
        }
    }

    if (projectsArray.length > 0) {
        return (
            <div>
                <mui.Button variant='contained' disabled={disabled} onClick={hideAddProjectPopup}>add project</mui.Button>

                { !isAddProjectHidden ? <AddProjectPopup hideAddProjectPopup={hideAddProjectPopup} /> : null}

                { !isEditProjectHidden ?
                    <EditProjectPopup
                        projectId={projectId}
                        projectName={projectName}
                        projectDescr={projectDescr}
                        projectEmployeeId={projectEmployeeId}
                        hideEditProjectPopup={hideEditProjectPopup} /> : null}

                <ProjectTable disabled={disabled} projectsArray={projectsArray} projects={projects} hideEditProjectPopup={hideEditProjectPopup} />
            </div>
        )
    } else {
        return <h1 className='not-found'>No Projects Found</h1>
    }
}

export default Project; 