import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as CgIcons from 'react-icons/cg'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='trackerfy-info'>
                <p className='footer-title'>About</p>
                <p >This site's main purpose is to 'track' bugs/errors and tasks to be delegated to the
                appropriate employee in product/app development. There are four main roles: Admin, Project Manager, Developer (dev), and Submitter:
                    Admin has all access permissions (including assigning roles to new employees), Project Managers assign tickets, Submitters create tickets, and Developers manage ticket status.  </p>
            </div>
            <div >
                <p className='footer-title'>Site Links</p>
                <a href='https://github.com/qsmity/Bug-tracker'>
                    <FaIcons.FaGithubSquare size='32px'/>
                </a>

            </div>
            <div >
                <p className='footer-title'>My Links</p>
                <a href='https://github.com/qsmity'>
                    <FaIcons.FaGithubSquare size='32px'/>
                </a>
                <a href='https://www.linkedin.com/in/quynn-smith-a442671bb/'>
                    <FaIcons.FaLinkedin size='32px'/>
                </a>
                <a href='https://www.quynnsmith.com'>
                    <CgIcons.CgWebsite size='32px'/>
                </a>
            </div>
        </div>
    )
}

export default Footer