import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'
import * as FaIcons from 'react-icons/fa'
import * as CgIcons from 'react-icons/cg'



function Navbar() {
    const [activeSidebar, setActiveSidebar] = useState(false)
    const toggleSidebar = (e) => setActiveSidebar(!activeSidebar)
    return (
        <>
            <div className='navbar'>
                <NavLink to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={toggleSidebar} />
                </NavLink>
                <div className='navbar__logo'>
                    <CgIcons.CgTrack className='menu-bars menu-bars--purple'/>
                    <h1>Trackerfy</h1>
                </div>
                <div className='navbar__logout'>
                    <LogoutButton />
                </div>
            </div>
            <nav className={activeSidebar ? 'nav-menu nav-menu--active' : 'nav-menu'}>
                <ul className='nav-menu__items' onClick={toggleSidebar}>
                    <li className='nav-menu__toggle'>
                        <NavLink to='#' className='nav-menu__close'>
                            <FaIcons.FaWindowClose onClick={toggleSidebar} />
                        </NavLink>
                    </li>
                    <li className='nav-menu__item'>
                        <NavLink className='nav-menu__link' to='/login' >Login</NavLink>
                    </li>
                    <li className='nav-menu__item'>
                        <NavLink className='nav-menu__link' to='/signup' >Sign Up</NavLink>
                    </li>
                    <li className='nav-menu__item'>
                        <NavLink className='nav-menu__link' to='/admin/dashboard' >Dashboard</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
