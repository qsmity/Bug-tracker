export const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES'
export const REMOVE_EMPLOYEES = 'REMOVE_EMPLOYEES'


//actions
export const loadEmployees = (employees) => ({
    type: LOAD_EMPLOYEES,
    employees

})

export const removeEmployees = () => ({
    type: REMOVE_EMPLOYEES
})

//thunk
export const getEmployees = () => async (dispatch) => {
    try{
        const res = await fetch('/users')

        //logged in user
        const { employees } = await res.json()
        dispatch(loadEmployees(employees))
    } catch (err){
        console.log(err)
        //enventually will push into errors array in store
    }
}

//thunk
export const updateEmployeeRole = (employeeId, roleId ) => async (dispatch) => {
    const parsedEmployeeId = parseInt(employeeId, 10)
    try{
        const body = { roleId }
        const res = await fetch(`/users/${parsedEmployeeId}`, {
            method: 'PUT', 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(body)
        })

        if(!res.ok){
            throw res
        }

        dispatch(getEmployees())
    } catch (err){
        console.error(err.message)
        //enventually will push into errors array in store
    }
}