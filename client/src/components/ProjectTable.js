import React from 'react'

const ProjectTable = ({ projectsArray, disabled }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Project</th>
                    <th>description</th>
                    <th>assigned employees</th>
                    <th>comments</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {projectsArray.map(project => {
                    return <tr key={project.id}>
                        <td>
                            {project.name}
                        </td>
                        <td>{project.description}</td>
                        <td>
                            {project.Employees ? project.Employees.map(employee => {
                                return <li key={employee.id}>
                                    {employee.name}
                                </li>
                            }
                            ): ''
                        }
                        </td>
                        <td>{project.comments ?
                            project.comments.map(comment => {
                                const [employeeId, text] = comment.split('__')
                                const parsedEmployeeId = parseInt(employeeId, 10)
                                return <li key={parsedEmployeeId}>{text}</li>
                            })
                            : <h3>no comments</h3>
                        }</td>
                        <td><button disabled={disabled} id={project.id} >Delete</button></td>
                    </tr>
                }
                )}
            </tbody>
        </table>
    )
}

export default ProjectTable; 