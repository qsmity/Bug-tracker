import React from 'react'
//not using HOC container so don't need to import * from sessionAction to avoid namespce collision
import { logout } from '../actions/sessionAction'
import { useDispatch } from 'react-redux';

const LogoutButton = () => {
    const dispatch = useDispatch()

    //handle click
    const logoutUser = async (e) => {
        dispatch(logout())
    }

    return (
        <div>
            <button onClick={logoutUser} type='submit'>Logout</button>
        </div>
    )
}

export default LogoutButton; 