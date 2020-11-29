import React, { useEffect } from 'react'
import * as mui from '@material-ui/core';
import * as FiIcons from 'react-icons/fi'
import * as IoIcons from 'react-icons/io'

const ProjectTable = ({ projectsArray, disabled }) => {

    //re-render if project added or edited
    useEffect(() => {

    }, [projectsArray])

    return (
        <>
            <mui.TableContainer >
                <mui.Table className='project-table-container'>
                    <mui.TableHead>
                        <mui.TableRow>
                            <mui.TableCell align='left'>Project</mui.TableCell>
                            <mui.TableCell align='center'>Description</mui.TableCell>
                            <mui.TableCell align='center'>Assigned Employees</mui.TableCell>
                            <mui.TableCell align='center'>Comments</mui.TableCell>
                            <mui.TableCell align='right'></mui.TableCell>
                            <mui.TableCell align='right'></mui.TableCell>
                        </mui.TableRow>
                    </mui.TableHead>
                </mui.Table>
                <div className='table-container' style={{ overflow: 'auto', height: '500px'}}>
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
                                            <ul>
                                                {project.comments ?
                                                    project.comments.map(comment => {
                                                        const [employeeId, text] = comment.split('__')
                                                        const parsedEmployeeId = parseInt(employeeId, 10)
                                                        return <li key={parsedEmployeeId}>{text}</li>
                                                    })
                                                    : 'no comments'
                                                }

                                            </ul>
                                        </mui.TableCell>
                                        {/* to do add edit functionality */}
                                        <mui.TableCell><FiIcons.FiEdit2 className='edit-icon' disabled={disabled} onClick={(e) => console.log('hello')} />
                                        </mui.TableCell>
                                        <mui.TableCell>
                                            <IoIcons.IoIosTrash
                                                className='delete-icon'
                                                id={project.id}
                                                disabled={disabled}
                                                onClick={e => console.log('delete')}
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