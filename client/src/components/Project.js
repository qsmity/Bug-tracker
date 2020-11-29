import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../actions/projectAction'
import AddProjectPopup from './AddProjectPopup'
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

    //open and close modal logic
    const hidePopup = () => {
        if (isHidden === true) {
            setIsHidden(false)
        } else {
            setIsHidden(true)
        }
    }

    if (projectsArray.length > 0) {
        return (
            <div>
                <mui.Button  variant='contained' disabled={disabled} onClick={hidePopup}>add project</mui.Button>
                { !isHidden ? <AddProjectPopup hidePopup={hidePopup} /> : null}
                <ProjectTable disabled={disabled} projectsArray={projectsArray} />
            </div>
        )
    } else {
        return <h1 className='not-found'>No Projects Found</h1>
    }
}

export default Project; 