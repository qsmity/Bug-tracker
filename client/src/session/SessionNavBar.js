import React from 'react'
import { NavLink } from 'react-router-dom'
import * as CgIcons from 'react-icons/cg'

const SessionNavBar = () => {
    return (
        <div className='navbar login-navbar'>
            <div className='navbar__logo'>
                <CgIcons.CgTrack />
                <p className='navbar__header login-navbar__header'>Trackerfy</p>
            </div>
            <div className='login-navbar__button'>
                <div>
                    <NavLink className='login-navbar__text' to='/login' >Login</NavLink>
                </div>
                <div>
                    <NavLink className='login-navbar__text' to='/signup' >Sign Up</NavLink>
                </div>
            </div>
        </div>
    )
}

export default SessionNavBar