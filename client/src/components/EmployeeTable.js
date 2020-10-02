import React from 'react'
import { useDispatch } from 'react-redux'
import * as employeeAction from '../actions/employeeAction'

const EmployeeTable = ({ employeesArray }) => {
    const dispatch = useDispatch()
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

    const deleteEmployee = (e) => {
        if (window.confirm('Are you sure you wish to delete this item?')){
            dispatch(employeeAction.deleteEmployee(e.target.id))
        }
        return
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Employee</th>
                    <th>Role</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {employeesArray.map(employee => {
                    return <tr key={employee.id}>
                        <td>
                            {employee.name}
                        </td>
                        <td>{mapRoleIdToName(employee.roleId)}</td>
                        <td><button id={employee.id} onClick={deleteEmployee}>Delete</button></td>
                    </tr>
                }
                )}
            </tbody>
        </table>
    )
}

export default EmployeeTable; 