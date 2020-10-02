export const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES'
export const REMOVE_EMPLOYEES = 'REMOVE_EMPLOYEES'
export const REMOVE_ONE_EMPLOYEE = 'REMOVE_ONE_EMPLOYEE'


//actions
export const loadEmployees = (employees) => ({
    type: LOAD_EMPLOYEES,
    employees

})

export const removeEmployees = () => ({
    type: REMOVE_EMPLOYEES
})

export const removeOneEmployee = (employeeId) => ({
    type: REMOVE_ONE_EMPLOYEE,
    employeeId
})

//thunk
export const getEmployees = () => async (dispatch) => {
    try {
        const res = await fetch('/api/users')

        //logged in user
        const { employees } = await res.json()
        if(!res.ok){    
            throw res
        }
        if(employees){
            dispatch(loadEmployees(employees))
        }
        return
    } catch (err) {
        console.log(err)
        //enventually will push into errors array in store
    }
}

//thunk
export const updateEmployeeRole = (employeeId, roleId) => async (dispatch) => {
    const parsedEmployeeId = parseInt(employeeId, 10)
    try {
        const body = { roleId }
        const res = await fetch(`/api/users/${parsedEmployeeId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            throw res
        }

        dispatch(getEmployees())
    } catch (err) {
        console.error(err.message)
        //enventually will push into errors array in store
    }
}

export const deleteEmployee = (employeeId) => async (dispatch) => {
    const parsedEmployeeId = parseInt(employeeId, 10)
    try {
        const res = await fetch(`/api/users/${parsedEmployeeId}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            throw res
        }

        dispatch(removeOneEmployee(parsedEmployeeId))
    } catch (err) {
        console.error(err.message)
        //enventually will push into errors array in store
    }
}