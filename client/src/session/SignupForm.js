import React, { useState } from 'react'
//not using HOC container so don't need to import * from sessionAction to avoid namespce collision
import { signup } from '../actions/sessionAction'
import { useDispatch } from 'react-redux';
import * as mui from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import * as CgIcons from 'react-icons/cg'




const SignupForm = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const updateName = (e) => setName(e.target.value)
    const updateEmail = (e) => setEmail(e.target.value)
    const updatePassword = (e) => setPassword(e.target.value)

    //handle submit
    const signupUser = async (e) => {
        e.preventDefault()
        dispatch(signup(name, email, password))
    }

    return (
        <>
            <div className='navbar login-navbar'>
                <div className='login-navbar__logo'>
                    <NavLink to='#' className='menu-bars'>
                        <CgIcons.CgTrack />
                    </NavLink>
                    <h1 className='navbar__header login-navbar__header'>Trackerfy</h1>
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
            <div className='dashboard-grid__component-login login'>
                <div className='component__topbar'>Sign Up here</div>
                <form className='login-form' onSubmit={signupUser}>
                    <mui.TextField id="standard-basic" label="Name" onChange={updateName} name='name' type='name' value={name} required />
                    <mui.TextField id="standard-basic" label="Email" onChange={updateEmail} name='email' type='email' value={email} required />
                    <mui.TextField id="standard-basic" label="Password" onChange={updatePassword} name='password' type='password' value={password} required />
                    <mui.Button variant='contained' color='primary' type='submit'>Sign Up</mui.Button>
                </form>
            </div>
        </>
    )
}



export default SignupForm; 