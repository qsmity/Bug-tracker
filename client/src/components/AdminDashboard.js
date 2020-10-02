import React from 'react'
import Employee from './Employee'
import Project from './Project'
import Ticket from './Ticket'
import LogoutButton from './LogoutButton'
import '../adminDashboard.css';


const AdminDashboard = () => {
    return (
        <div>
            <h1>admin dashboard</h1>
            <nav>
                <LogoutButton />
            </nav>
            <div className='employee-container'>
                <Employee />
            </div>
            <div className='employee-container'>
                <Project />
            </div>
            <div className='employee-container'>
                <Ticket />
            </div>
        </div>
    )
}

export default AdminDashboard; 