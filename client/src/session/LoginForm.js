import React, { useState } from 'react'
//not using HOC container so don't need to import * from sessionAction to avoid namespce collision
import { login } from '../actions/sessionAction'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import * as mui from '@material-ui/core';
import SessionNavBar from './SessionNavBar';
import Footer from './Footer';

const LoginForm = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const updateEmail = (e) => setEmail(e.target.value)
    const updatePassword = (e) => setPassword(e.target.value)

    //handle submit
    const loginUser = async (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <>
            <SessionNavBar/>
            <div className='dashboard-grid__component-login login'>
                <div className='component__topbar'><h3>Login Here</h3></div>
                <form className='login-form' onSubmit={loginUser}>
                    <mui.TextField  label="Email" onChange={updateEmail} name='email' type='email' value={email} required />
                    <mui.TextField label="Password" onChange={updatePassword} name='password' type='password' value={password} required />
                    <mui.Button variant='contained' color='primary' type='submit'>Submit</mui.Button>
                </form>
                <div><Link onClick={() => {
                    setEmail('demo1@example.com')
                    setPassword('password1')
                }
                } to='#'>demo_user_admin</Link></div>
                <div><Link onClick={(e) => {
                    setEmail('demo2@example.com')
                    setPassword('password2')
                }
                } to='#'>demo_user_projectManager</Link></div>
                <div><Link onClick={(e) => {
                    setEmail('demo3@example.com')
                    setPassword('password3')
                }
                } to='#'>demo_user_dev</Link></div>
                <div><Link onClick={(e) => {
                    setEmail('demo4@example.com')
                    setPassword('password4')
                }
                } to='#'>demo_user_submitter</Link></div>
            </div>
            <Footer/>
        </>
    )
}



export default LoginForm