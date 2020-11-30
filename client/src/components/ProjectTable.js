import React, { useEffect } from 'react'
import * as mui from '@material-ui/core';
import * as FiIcons from 'react-icons/fi'
import * as IoIcons from 'react-icons/io'
import * as ProjectActions from '../actions/projectAction'
import { useDispatch } from 'react-redux'

const ProjectTable = ({ projectsArray, projects, disabled, hideEditProjectPopup }) => {
    const dispatch = useDispatch()

    //re-render if ticket edited to show changes
    useEffect(() => {

    }, [projects])

    //handle edit click
    const editProject = (e) => {
        hideEditProjectPopup(e.currentTarget.dataset.name,
            e.currentTarget.dataset.descr,
            e.currentTarget.dataset.employeeid,
            e.currentTarget.id,
        )
    }

    const deleteProject = (e) => {
        //if disabled is true, don't allow unauthorized user to delete ticket
        if (disabled) {
            alert('Not permitted to delete tickets')
        } else {
            //popup window confirming delete action is valid
            if (window.confirm('Are you sure you wish to delete this item?')) {
                dispatch(ProjectActions.deleteProject(e.currentTarget.id))
            }
            return
        }
        return
    }

    return (
        <>
            <mui.TableContainer >
                <mui.Table className='project-table-container'>
                    <mui.TableHead>
                        <mui.TableRow>
                            <mui.TableCell align='left'>Project</mui.TableCell>
                            <mui.TableCell align='right'>Description</mui.TableCell>
                            <mui.TableCell align='center' style={{ paddingLeft: '260px' }}>Assigned Employees</mui.TableCell>
                            <mui.TableCell align='right'></mui.TableCell>
                            <mui.TableCell align='right'></mui.TableCell>
                        </mui.TableRow>
                    </mui.TableHead>
                </mui.Table>
                <div className='table-container' style={{ overflow: 'auto', height: '500px' }}>
                    <mui.Table >
                        <mui.TableBody>
                            {projectsArray.map(project => {
                                return (
                                    <mui.TableRow key={project.id}>
                                        <mui.TableCell>{project.name}</mui.TableCell>
                                        <mui.TableCell>{project.description}</mui.TableCell>
                                        <mui.TableCell>
                                            <ul>
                                                {project.Employees ? project.Employees.map(employee => {
                                                    return <li key={employee.id}>
                                                        {employee.name}
                                                    </li>
                                                }
                                                ) : ''
                                                }

                                            </ul>
                                        </mui.TableCell>
                                        <mui.TableCell>
                                            <FiIcons.FiEdit2
                                                className='edit-icon'
                                                disabled={disabled}
                                                onClick={editProject}
                                                id={project.id}
                                                data-name={project.name}
                                                data-descr={project.description}
                                                data-employeeid={project.employeeId}/>

                                        </mui.TableCell>
                                        <mui.TableCell>
                                            <IoIcons.IoIosTrash
                                                className='delete-icon'
                                                id={project.id}
                                                disabled={disabled}
                                                onClick={deleteProject}
                                                size='24'>
                                                Delete
                                            </IoIcons.IoIosTrash>
                                        </mui.TableCell>
                                    </mui.TableRow>)
                            })}

                        </mui.TableBody>
                    </mui.Table>
                </div>

            </mui.TableContainer>
        </>
    )
}

export default ProjectTable; 