import React, { useState } from 'react'
//not using HOC container so don't need to import * from sessionAction to avoid namespce collision
import { login } from '../actions/sessionAction'
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
// import * as FaIcons from 'react-icons/fa'
import * as CgIcons from 'react-icons/cg'
import * as FaIcons from 'react-icons/fa'
import * as mui from '@material-ui/core';
import ProfilePic from '../images/facebook-profile-pic.jpg'



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
                <div className='component__topbar'>Login Here</div>
                <form className='login-form' onSubmit={loginUser}>
                    <mui.TextField id="standard-basic" label="Email" onChange={updateEmail} name='email' type='email' value={email} required />
                    <mui.TextField id="standard-basic" label="Password" onChange={updatePassword} name='password' type='password' value={password} required />
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
            <div className='trackerfy-info'>
                <p >Preface:</p>
                <p >This site's main purpose is to 'track' bugs/errors and tasks to be delegated to the 
                    appropriate employee in product/app development. There are four main roles: admin, project managers, developers(devs), and sumitters.
                    admin has all access permissions (including assigning roles to new employees), project managers assign tickets, submitters create tickets, and devs manage ticket status.  </p>
            </div>
            <div className='footer'>
                <div>
                    <h4>frameworks</h4>
                    <ul>
                        <li>react</li>
                        <li>express</li>
                    </ul>
                </div>
                <div>
                    <h4>libraries</h4>
                    <ul>
                        <li>redux</li>
                        <li>role based action control (rbac)</li>
                        <li>sequelize</li>
                        <li>material ui</li>
                        <li>react icons</li>
                        <li>JSON web token</li>
                        <li>bcrypt</li>
                    </ul>
                </div>
                <div>
                    <h4>languages</h4>
                    <ul>
                        <li>javaScript</li>
                        <li>JSX</li>
                        <li>sql</li>
                    </ul>
                </div>
                <div>
                    <h2>Creator</h2>
                    <div className='img-card'>
                        <div className='cropped'>
                            <img className='cropped__img' src={ProfilePic} alt='profile' width='200px' height='300px' />
                        </div>
                        <p>Quynn Smith</p>
                        <div >
                            <FaIcons.FaGithub className='github-link' onClick={()=>window.location.href='https://github.com/qsmity'}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default LoginForm