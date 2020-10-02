## component organization
- root
    - app
        - navBar
        - `main component`
        - Footer

## `Main component` will house the following components and paths
- / 
    - dashboard: 
        - `Ticket component`
        - `Project component`
        - `Employee component`
        - admin: 
            - list of all projects , tickets, Employees (unassigned and assigned)
        - project owner: 
            - list of all tickets to all devs
        - dev: 
            - list of all tickets assigned to dev
        - submitter: 
            - form for creating a ticket 
- /login
    - `loginForm component`
    - form displayed to login
    - link to signup form
    - demo user
- /signup
    - `SignupForm component`
    - form displayed to signup
    - link to login form
- /tickets/:ticketId
    - `Ticket component`
    - admin, project owner, dev: 
        - ticket details
- /tickets/:ticketId/edit
    - `Ticket component`
    - admin and project owner: 
        - edit name, description, severity level, status
        - add comments
    - dev: 
        - edit status
        - add comments



## Bonus
- /profile/:employeeId
    - `Profile component`
    - display info about employee (role, email, change password)