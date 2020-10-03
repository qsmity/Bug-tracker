import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../actions/projectAction'
import AddProjectForm from './AddProjectForm'
import ProjectTable from './ProjectTable'


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
                <button disabled={disabled} onClick={addProject}>add project</button>
                <div className={isHidden ? 'hidden' : ''}>
                    <AddProjectForm />
                </div>
                <h1>Projects</h1>
                <ProjectTable disabled={disabled} projectsArray={projectsArray} />
            </div>
        )
    } else {
        return <h2>no projects found</h2>
    }
}

export default Project; 