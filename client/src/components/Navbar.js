import React from 'react'
import LogoutButton from '../components/LogoutButton'
import * as CgIcons from 'react-icons/cg'



function Navbar({ currentEmployee }) {
    return (
        <>
            <div className='navbar'>
                <div>
                    <p>Signed in as {currentEmployee.name}
                    </p>
                </div>
                <div className='navbar__logo'>
                    <CgIcons.CgTrack className='logo-target'/>
                    <p>Trackerfy</p>
                </div>
                <div className='navbar__logout'>
                    <LogoutButton />
                </div>
            </div>
        </>
    )
}

export default Navbar
