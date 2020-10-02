const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const { environment } = require('./config/index')
const { ValidationError } = require("sequelize");
const cookieParser = require('cookie-parser')
const path = require('path')
// const routes = require('./routes')

//external imports 
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser())


//api
const usersRouter  = require('./routes/users')
const sessionRouter = require('./routes/session')
const { projectsRouter } = require('./routes/projects')
const ticketsRouter = require('./routes/tickets')

//api mounted routes
app.use('/api/users', usersRouter)
app.use('/api/session', sessionRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/tickets', ticketsRouter)


app.use(express.static(path.join(__dirname, '/client/build')));

app.get(/\/(?!api)*/, (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// 'create:any': ['*'],
// 'read:any': ['*'],
// 'update:any': ['*', '!views'],
// 'delete:any': ['*']
//setting up access control permisssions

// console.log(ac.getGrants())

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

// Error handlers. (must have all four arguments to communicate to Express that
// this is an error-handling middleware function)

// Process sequelize errors
app.use((err, req, res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = "Sequelize Error";
    }
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === "production";
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app