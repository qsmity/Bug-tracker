export const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES'


//action
export const loadEmployees = (employees) => ({
    type: LOAD_EMPLOYEES,
    employees

})

//thunk
export const getEmployees = () => async (dispatch) => {
    try{
        const res = await fetch('/users')

        //logged in user
        const { employees } = await res.json()
        console.log(employees)
        dispatch(loadEmployees(employees))
    } catch (err){
        console.log(err)
        //enventually will push into errors array in store
    }
}