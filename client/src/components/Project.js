import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../actions/projectAction'
import AddProjectForm from './AddProjectForm'
import ProjectTable from './ProjectTable'
import '../project.css'

const Project = () => {
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
                <button onClick={addProject}>add project</button>
                <div className={isHidden ? 'hidden' : ''}>
                    <AddProjectForm />
                </div>
                <h1>Project component</h1>
                <ProjectTable projectsArray={projectsArray} />
            </div>
        )
    } else {
        return <h2>no projects found</h2>
    }
}

export default Project; 