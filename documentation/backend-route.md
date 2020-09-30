# API Endpoints 

### users
- `GET /users` - returns all employees in db (admin role) with roles if they are assigned
- `POST /users` - sign up employee with unassined role
- `PUT /users/:employeeId` - update employee role in db(admin role)

### session
- `POST /session` log in employee
- `DELETE /session` log out employee

### projects
- `GET /projects` return all projects if admin or submitter role. Otherwise return all projects assigned to (projectManager, dev)
- `POST /projects` add new project (admin role)
- `PUT /projects` update project (admin role)


### tickets
- `GET /tickets` return all tickets if admin or submitter role. return all tickets assigned to (projectManager, dev)
- `POST /tickets` add new ticket (admin and project owner role)
- `PUT /tickets/:ticketId` update ticket (admin and project owner role) all field of a ticket
- `PUT /dev/tickets/:ticketId` update ticket with comment or status change only
    (dev role)

