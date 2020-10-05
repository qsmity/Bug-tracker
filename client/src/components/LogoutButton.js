import React from 'react'
//not using HOC container so don't need to import * from sessionAction to avoid namespce collision
import { logout } from '../actions/sessionAction'
import { useDispatch } from 'react-redux';
import * as mui from '@material-ui/core';


const LogoutButton = () => {
    const dispatch = useDispatch()

    //handle click
    const logoutUser = async (e) => {
        dispatch(logout())
    }

    return (
        <div>
            <mui.Button variant='contained' color='primary' onClick={logoutUser} type='submit'>Logout</mui.Button>
        </div>
    )
}

export default LogoutButton; 