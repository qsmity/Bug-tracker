# API Endpoints 

### users
- `GET /api/users` - returns all employees in db (admin role) with roles if they are assigned
- `POST /api/users` - sign up employee with unassined role
- `PUT /api/users/:employeeId` - update employee role in db(admin role)

### session
- `POST /api/session` log in employee
- `DELETE /api/session` log out employee

### projects
- `GET /api/projects` return all projects (admin role)
- `POST /api/projects` add new project (admin role)
- `PUT /api/projects/:projectId` update project (admin role)


### tickets
- `GET /api/tickets` return all ticket (admin role)
- `POST /api/tickets` add new ticket (admin and project owner role)
- `PUT /api/tickets/:ticketId` update ticket (admin and project owner role) all field of a ticket
- `PUT /api/dev/tickets/:ticketId` update ticket with comment or status change only
    (dev role)

