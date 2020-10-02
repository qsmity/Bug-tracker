import React, { useState } from 'react'
//not using HOC container so don't need to import * from sessionAction to avoid namespce collision
import { login } from '../actions/sessionAction'
import { useDispatch } from 'react-redux';

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
        <div>
            <form onSubmit={loginUser}>
                <h2>login here</h2>
                <input onChange={updateEmail} name='email' type='email' value={email} required />
                <input onChange={updatePassword} name='password' type='password' value={password} required />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}



export default LoginForm