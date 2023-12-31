// IMPORTS
const express = require('express')
const taskRoutes = require('./routes/taskRoutes')
const authController = require('./controllers/authController')
const friendsRoutes = require('./routes/friendsRoutes')
const friendsController = require('./controllers/friendsController')
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')
const session = require('express-session')
const mongoose = require('mongoose')
const app = express()

// Load environment variables from a .env file
require('dotenv').config()

const PORT = process.env.PORT || 3000
const mongoURI = process.env.MONGO_URI

// connect to mongo 
mongoose.connect(mongoURI)

const db = mongoose.connection

// create status messages to check mongo connection 
db.on('error', (err) => { console.log('ERROR: ' , err)})
db.on('connected', () => { console.log('mongo connected')})
db.on('disconnected', () => { console.log('mongo disconnected')})


// Middleware ////////////////////////////////////////////////

// Static Files
app.use(express.static('public'))

// EJS Views
app.set('view engine', 'ejs')

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
  
// POST Parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Method Override
app.use(methodOverride('_method'))

// Custom authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/login') 
  }
}

// Route Definitions  ////////////////////////////////////////////////
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

// Use the routes from authController
app.use('/', authController)

// Task Route definition
app.use('/tasks', isAuthenticated, taskRoutes)

app.use(friendsRoutes)

// Basic Error handling
app.use((req, res, next) => {
  console.log(`Request made to url: ${req.url}`)
  res.status(404).send('404 Not Found')
  next()
})

// Server Instructions ////////////////////////////////////////////////
const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})

 process.on('SIGINT', () => {
     console.log('\nServer is shutting down...')
     server.close(() => {
       console.log('Server has been closed.')
       process.exit(0);
     })
   })

