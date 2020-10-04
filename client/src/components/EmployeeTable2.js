import React from 'react'
import { useDispatch } from 'react-redux'
import * as employeeAction from '../actions/employeeAction'
import * as mui from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const EmployeeTable2 = ({ employeesArray }) => {
    const useStyles = makeStyles({
        root: {
            fontSize: '20px',
        },
        table: {
            fontSize: '20px'
        },
    });
    const classes = useStyles();

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
        if (window.confirm('Are you sure you wish to delete this item?')) {
            dispatch(employeeAction.deleteEmployee(e.target.id))
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
                </mui.Table>
                <div style={{ overflow: 'auto', height: '300px'}}>
                    <mui.Table size="small" aria-label="a dense table">
                        <mui.TableBody>
                            {employeesArray.map(employee => {
                                return (
                                    <>
                                        <mui.TableRow key={employee.id}>
                                            <mui.TableCell>{employee.name}</mui.TableCell>
                                            <mui.TableCell>{mapRoleIdToName(employee.roleId)}</mui.TableCell>
                                            <mui.TableCell><mui.Button id={employee.id} onClick={deleteEmployee}>Delete</mui.Button></mui.TableCell>
                                        </mui.TableRow>
                                    </>
                                )
                            })}

                        </mui.TableBody>
                    </mui.Table>
                </div>
            </mui.TableContainer>
        </>
    )

}

export default EmployeeTable2; 