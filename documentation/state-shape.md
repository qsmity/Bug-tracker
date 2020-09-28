## state shape 
 ``` javascript store = {
entities: {
    employees: 
            {id, name, email, role}
    projects: 
            {id, name, description, comments: [array of comments]}
    tickets: 
            {id, name, description, severityLevel, status, type}
                }
applicationErrors: 
            [array of errors]
session: {
            currentUserId,
            authToken,
            role
    }
}
```