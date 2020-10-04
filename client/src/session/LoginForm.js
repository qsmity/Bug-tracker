import React, { useState } from 'react'
//not using HOC container so don't need to import * from sessionAction to avoid namespce collision
import { login } from '../actions/sessionAction'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
// import * as FaIcons from 'react-icons/fa'
import * as CgIcons from 'react-icons/cg'


const LoginForm = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('demo1@example.com')
    const [password, setPassword] = useState('password1')
    const updateEmail = (e) => setEmail(e.target.value)
    const updatePassword = (e) => setPassword(e.target.value)

    //handle submit
    const loginUser = async (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <>
            <div className='navbar login-navbar'>
                <NavLink to='#' className='menu-bars'>
                    <CgIcons.CgTrack />
                </NavLink>
                <h1 className='navbar__header login-navbar__header'>Trackerfy</h1>
            </div>
            <div className='dashboard-grid__component login'>
                <div className='component__topbar'><h2>Login Here</h2></div>
                <form onSubmit={loginUser}>
                    <input onChange={updateEmail} name='email' type='email' value={email} required />
                    <input onChange={updatePassword} name='password' type='password' value={password} required />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}



export default LoginForm