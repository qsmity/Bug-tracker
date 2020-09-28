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
        - `User component`
        - `TicketProposalForm component`
        - admin: 
            - list of all projects , tickets, users (unassigned and assigned)
        - project owner: 
            - list of all tickets to all devs
        - dev: 
            - list of all tickets assined to dev
        - submitter: 
            - form for submitting a ticket propoal
- /login
    - `loginForm component`
    - form displayed to login
    - link to register form
    - demo user
- /register
    - `registerForm component`
    - form displayed to register
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
- /profile/:userId
    - `Profile component`
    - display info about user (role, email, change password)