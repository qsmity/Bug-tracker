import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getEmployees } from '../actions/employeeAction'
import EmployeeTable2 from './EmployeeTable2'
import * as mui from '@material-ui/core';
import EditEmployeePopup from './EditEmployeePopup'


const Employee = ({ employeesArray, disabled }) => {
    const dispatch = useDispatch()

    //hidden state for edit employee popup
    const [isHidden, setIsHidden] = useState(true)

    //open and close modal logic
    const hidePopup = () => {
        if (isHidden === true) {
            setIsHidden(false)
        } else {
            setIsHidden(true)
        }
    }

    useEffect(() => {
        dispatch(getEmployees())
    }, [dispatch])

    if (employeesArray.length > 0) {
        return (
            <div>
                <mui.Button variant='contained' disabled={disabled} onClick={hidePopup} type='click'>Edit Employee</mui.Button>
                <EmployeeTable2 employeesArray={employeesArray} disabled={disabled}/>
                { !isHidden ? <EditEmployeePopup hidePopup={hidePopup} /> : null}

            </div>
        )
    } else {
        return <h1>N/A</h1>
    }



}

export default Employee;