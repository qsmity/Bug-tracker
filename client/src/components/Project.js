import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../actions/projectAction'
import AddProjectForm from './AddProjectForm'
import ProjectTable from './ProjectTable'
import * as mui from '@material-ui/core';



const Project = ({disabled}) => {
    const dispatch = useDispatch()
    const projects = useSelector(state => state.projects)
    const projectsArray = Object.values(projects)
    const [isHidden, setIsHidden] = useState(true)


    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    //handle on click create projecdt
    const addProject = (e) => {
        setIsHidden(!isHidden)
    }

    // console.log(Object.values(employees))
    if (projectsArray.length > 0) {
        return (
            <div >
                <mui.Button  variant='contained' disabled={disabled} onClick={addProject}>add project</mui.Button>
                <div className={isHidden ? 'hidden' : ''}>
                    <AddProjectForm />
                </div>
                <ProjectTable disabled={disabled} projectsArray={projectsArray} />
            </div>
        )
    } else {
        return <h1 className='not-found'>No Projects Found</h1>
    }
}

export default Project; 