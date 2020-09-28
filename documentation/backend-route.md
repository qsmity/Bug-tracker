# API Endpoints 

### users
- `GET /api/users` - returns all user in db (admin role) with roles if they are assigned
- `POST /api/users` - sign up user with unassined role
- `PUT /api/users` - update user role in db(admin role)

### session
- `POST /api/session` log in user
- `DELETE /api/session` log out user

### projects
- `POST /api/projects` add new project (admin role)
- `PUT /api/projects/:projectId` update project (admin role)


### tickets
- `POST /api/tickets` add new ticket (admin and project owner role)
- `PUT /api/tickets/:ticketId` update ticket (admin and project owner role) all field of a ticket
- `PUT /api/dev/tickets/:ticketId` update ticket with comment or status change only
    (dev role)

