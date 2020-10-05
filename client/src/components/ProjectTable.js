import React from 'react'
import * as mui from '@material-ui/core';
import * as FiIcons from 'react-icons/fi'


const ProjectTable = ({ projectsArray, disabled }) => {
    return (
        <>
            <mui.TableContainer>
                <mui.Table>
                    <mui.TableHead>
                        <mui.TableRow>
                            <mui.TableCell>Project</mui.TableCell>
                            <mui.TableCell>Description</mui.TableCell>
                            <mui.TableCell>Assigned Employees</mui.TableCell>
                            <mui.TableCell>Comments</mui.TableCell>
                            <mui.TableCell></mui.TableCell>
                        </mui.TableRow>
                    </mui.TableHead>
                </mui.Table>
                <div style={{ overflow: 'auto', height: '400px' }}>
                    <mui.Table size="small" aria-label="a dense table">
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
                                            <mui.TableCell><FiIcons.FiEdit2 className='edit-icon' disabled={disabled} onClick={(e) => console.log('hello')} />
                                            </mui.TableCell>
                                            <mui.TableCell><mui.Button id={project.id} disabled={disabled}>Delete</mui.Button></mui.TableCell>
                                        </mui.TableRow>                                )
                            })}

                        </mui.TableBody>
                    </mui.Table>
                </div>
            </mui.TableContainer>
        </>
    )
}

export default ProjectTable; 