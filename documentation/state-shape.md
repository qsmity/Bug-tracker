## state shape 
 ``` javascript store = {
entities: {
    employees: 
            [id]: {id, name, email, role}
    projects: 
           [id]:  {id, name, description, comments: [array of comments]}
    tickets: 
            [id]: {id, name, description, severityLevel, status, type}
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