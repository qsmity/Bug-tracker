import React from 'react'
import Employee from './Employee'
import LogoutButton from './LogoutButton'

const AdminDashboard = () => {
    return (
        <div>
            <h1>admin dashboard</h1>
            <nav>
                <LogoutButton/>
            </nav>
            <Employee />
        </div>
    )
}

export default AdminDashboard; 