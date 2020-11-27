import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles";
// import { editEmployee } from "../actions/ticketAction"
import * as mui from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const EditEmployeePopup = ({ hidePopup, ticketName, ticketDescr, ticketId }) => {
    const dispatch = useDispatch()

    const selectedEmployee = (e) => setSelectedEmployeeId(e.target.value)
    const employees = useSelector(state => state.employees)
    const employeesArray = Object.values(employees)
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("")
    const [roleToChange, setRoleToChange] = useState("")

    const classes = useStyles()

    //handle submit 
    const addEmployee = (e) => {
        e.preventDefault()
        hidePopup()
    }

    //handle role change 
    const roleChange = (e) => {
        setRoleToChange(e.target.value)
    }

    //handle close click
    const close = (e) => {
        hidePopup()
    }

    return (
        <div className="edit-overlay">
            <div className="popup">
                <div className="component__topbar component__topbar--blue"><h3>Edit Employee</h3></div>
                <mui.Button variant="contained" onClick={close} className="edit-employee-close">exit</mui.Button>
                <form className='employee-form' onSubmit={addEmployee}>
                    {/* put each select into a seperate form control due to weird input label overlap */}
                    <mui.FormControl variant="outlined" className={classes.formControl}>
                        <mui.InputLabel id="employee-name-label">Employee</mui.InputLabel>
                        <mui.Select labelId="employee-name-label" id="employee-name-label" onChange={selectedEmployee} label="Employee" value={selectedEmployeeId} required>
                            <mui.MenuItem value="" key={-1}>Select Employee</mui.MenuItem>
                            {employeesArray.map(employee => (
                                <mui.MenuItem key={employee.id} value={employee.id}>{employee.name}</mui.MenuItem>

                            ))
                            }
                        </mui.Select>
                    </mui.FormControl>
                    <mui.FormControl variant="outlined" className={classes.formControl}>
                        <mui.InputLabel id="employee-role-label">Role</mui.InputLabel>
                        <mui.Select labelId="employee-role-label" onChange={roleChange} id="employee-role-label" label='Role' name="roles" value={roleToChange} required>
                            <mui.MenuItem value="" key={-1}>Select Role</mui.MenuItem>
                            <mui.MenuItem value={0} key={0}>no role</mui.MenuItem>
                            <mui.MenuItem value={1} key={1}>admin</mui.MenuItem>
                            <mui.MenuItem value={2} key={2}>project manager</mui.MenuItem>
                            <mui.MenuItem value={3} key={3}>dev</mui.MenuItem>
                            <mui.MenuItem value={4} key={4}>submitter</mui.MenuItem>


                        </mui.Select>
                        <mui.Button variant="contained" type="submit">Submit</mui.Button>
                    </mui.FormControl>
                </form>
            </div>
        </div>
    )
}

export default EditEmployeePopup