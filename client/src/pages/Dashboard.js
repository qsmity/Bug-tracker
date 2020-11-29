import React, {useState, useEffect} from 'react'
import Employee from '../components/Employee'
import Project from '../components/Project'
import Ticket from '../components/Ticket'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'


const Dashboard = () => {
    const currentEmployee = useSelector(state => state.session)
    const currentEmployeeRole = currentEmployee.role

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
          <Navbar currentEmployee={currentEmployee}/>
        </nav>
        <div>
            {!currentEmployeeRole? <h2 className='not-found to-be-assigned-message'>** Wait To Be Assigned Role **</h2> : null}
        </div>
        <div className='dashboard-grid'>
            <div className={employeesArray.length <= 0 ? 'dashboard-grid__component-employee dashboard-grid__component--hidden' : 'dashboard-grid__component-employee'}>
                <div className='component__topbar'><h3>Employees</h3></div>
                <Employee employeesArray={employeesArray} disabled={disabled}/>
            </div>
            <div className='dashboard-grid__component-project'>
                <div className='component__topbar'><h3>Projects</h3></div>
                <Project disabled={disabled}/>
            </div>
            <div className='dashboard-grid__component-ticket'>
                <div className='component__topbar'><h3>Tickets</h3></div>
                <Ticket disabled={disabled} currentEmployeeRole={currentEmployeeRole}/>
            </div>
        </div>
    </>
    )
}

export default Dashboard; 