import React
// , { useEffect} 
from 'react'
// import { useDispatch } from 'react-redux'
import Employee from './Employee'

const AdminDashboard = () => {
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     return async () => {
    //         try {
    //             const res = await fetch('/users')
    //             if (!res.ok) {
    //                 throw res
    //             }

    //             const { employees } = await res.json()
    //             console.log(employees)

    //         } catch (err) {
    //             console.log(err)
    //         }

    //     }
    //     //add current userId
    // })
    return (
        <div>
            <h1>admin dashboard</h1>
            <Employee />
        </div>
    )
}

export default AdminDashboard; 