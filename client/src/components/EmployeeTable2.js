import React from 'react'
import { useDispatch } from 'react-redux'
import * as employeeAction from '../actions/employeeAction'
import * as mui from '@material-ui/core';
import * as IoIcons from 'react-icons/io'

const EmployeeTable2 = ({ employeesArray, disabled }) => {
    const dispatch = useDispatch()

    //mapping to convert numbers roles in the db to labeled names
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
        //if disabled (no permissions) alert action is not permitted
        if(disabled){
            alert('Not permitted to delete employees')
        } else {
            if (window.confirm('Are you sure you wish to delete this item?')) {
                dispatch(employeeAction.deleteEmployee(e.target.id))
            }
            return
        }
        return
    }

    return (
        <>
            <mui.TableContainer >
                <mui.Table>
                    <mui.TableHead>
                        <mui.TableRow>
                            <mui.TableCell>Employee</mui.TableCell>
                            <mui.TableCell>Role</mui.TableCell>
                            <mui.TableCell></mui.TableCell>
                        </mui.TableRow>
                    </mui.TableHead>
                    <mui.TableBody>
                        {employeesArray.map(employee => {
                            return (
                                <mui.TableRow key={employee.id}>
                                    <mui.TableCell>{employee.name}</mui.TableCell>
                                    <mui.TableCell>{mapRoleIdToName(employee.roleId)}</mui.TableCell>
                                    <mui.TableCell>
                                        <IoIcons.IoIosTrash
                                            className='delete-icon'
                                            id={employee.id}
                                            onClick={deleteEmployee}
                                            size='24'>
                                            Delete
                                            </IoIcons.IoIosTrash>
                                    </mui.TableCell>
                                </mui.TableRow>
                            )
                        })}

                    </mui.TableBody>
                </mui.Table>
            </mui.TableContainer>
        </>
    )

}

export default EmployeeTable2; 