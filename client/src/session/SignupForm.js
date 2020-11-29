import React, { useState } from 'react'
//not using HOC container so don't need to import * from sessionAction to avoid namespce collision
import { signup } from '../actions/sessionAction'
import { useDispatch } from 'react-redux';
import * as mui from '@material-ui/core';
import SessionNavBar from './SessionNavBar';




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
            <SessionNavBar/>
            <div className='dashboard-grid__component-login login'>
                <div className='component__topbar'><h3>Sign Up here</h3></div>
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