import React from 'react'

const EmployeeTable = ({ employeesArray }) => {
    const mapRoleIdToName = (roleId) => {
        switch (roleId) {
            case 1:
                return 'admin'
            case 2:
                return 'project manager'
            case 3:
                return 'dev'
            case 4:
                return 'submitter'
            default:
                return null

        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Employee</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {employeesArray.map(employee => {
                    return <tr key={employee.id}>
                        <td>
                            {employee.name}
                            <button>Delete</button>
                        </td>
                        <td>{mapRoleIdToName(employee.roleId)}</td>
                    </tr>
                }
                )}
            </tbody>
        </table>
    )
}

export default EmployeeTable; 