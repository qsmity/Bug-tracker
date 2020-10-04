import React, {useState, useEffect} from 'react'
import Employee from '../components/Employee'
import Project from '../components/Project'
import Ticket from '../components/Ticket'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'


const Dashboard = () => {
    const currentEmployeeRole = useSelector(state => state.session.role)
    const employees = useSelector(state => state.employees)
    const employeesArray = Object.values(employees)



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
        <>
        <nav>
          <Navbar/>
        </nav>
        <div className='dashboard-grid'>
            <div className={employeesArray.length <= 0 ? 'dashboard-grid__component dashboard-grid__component--hidden' : 'dashboard-grid__component'}>
                <div className='component__topbar'><h2>Employees</h2></div>
                <Employee employeesArray={employeesArray} disabled={disabled}/>
            </div>
            <div className='dashboard-grid__component'>
                <div className='component__topbar'>Projects</div>
                <Project disabled={disabled}/>
            </div>
            <div className='dashboard-grid__component'>
                <div className='component__topbar'><h2>Tickets</h2></div>
                <Ticket disabled={disabled}/>
            </div>
        </div>
    </>
    )
}

export default Dashboard; 