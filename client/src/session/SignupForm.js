import React, { useState } from 'react'
//not using HOC container so don't need to import * from sessionAction to avoid namespce collision
import { signup } from '../actions/sessionAction'
import { useDispatch } from 'react-redux';

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
        dispatch(signup( name, email, password ))
    }

    return (
        <div>
            <form onSubmit={signupUser}>
                <h2>Sign Up here</h2>
                <label htmlFor='name'>Name: </label>
                <input id='name' onChange={updateName} name='name' type='name' value={name} required />
                <label htmlFor='email'>Email: </label>
                <input id='email' onChange={updateEmail} name='email' type='email' value={email} required />
                <label htmlFor='password'>password: </label>
                <input id='password' onChange={updatePassword} name='password' type='password' value={password} required />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}



export default SignupForm; 