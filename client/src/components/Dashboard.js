import React, {useState, useEffect} from 'react'
import Employee from './Employee'
import Project from './Project'
import Ticket from './Ticket'
import LogoutButton from './LogoutButton'
import '../dashboard.css';
import { useSelector } from 'react-redux'


const Dashboard = () => {
    const currentEmployeeRole = useSelector(state => state.session.role)

    const [disabled, setDisabled] = useState(false)

    //checks user role. if not admin disabled will be true
    //this allows to disabled all delete buttons for non admin roles
    useEffect(()=> {
        if(currentEmployeeRole !== 1){
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [currentEmployeeRole])

    return (
        <div>
            <h1>admin dashboard</h1>
            <nav>
                <LogoutButton  />
            </nav>
            <div className='employee-container'>
                <Employee disabled={disabled} currentEmployeeRole={currentEmployeeRole}/>
            </div>
            <div className='employee-container'>
                <Project disabled={disabled} currentEmployeeRole={currentEmployeeRole}/>
            </div>
            <div className='employee-container'>
                <Ticket disabled={disabled} currentEmployeeRole={currentEmployeeRole}/>
            </div>
        </div>
    )
}

export default Dashboard; 