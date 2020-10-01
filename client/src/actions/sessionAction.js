import Cookies from 'js-cookie'
export const LOAD_SESSION = 'LOAD_SESSION'    



//action
export const loadSession = (user, token) => ({
    type: LOAD_SESSION,
    user, 
    token

})


//thunk
//getState is also a parms that return function inside thunk can have
export const login = ( email, password ) => async (dispatch) => {
    console.log('inside login thunk');
    
    //build a body for req
    const body = {
        email, 
        password
    }

    //grab current token
    const token = Cookies.get('token')

    //make a fetch call to db to login user
    try{
        const res = await fetch('/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        //logged in user
        const { employee } = await res.json()
        console.log(employee)
        dispatch(loadSession(employee, token))
    } catch (err){
        console.log(err)
        //enventually will push into errors array in store
    }
    
}

