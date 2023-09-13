// IMPORTS
const express = require('express')
const taskRoutes = require('./routes/taskRoutes')
const authController = require('./controllers/authController')
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')
const session = require('express-session')
const app = express()


require('dotenv').config()

const PORT = process.env.PORT || 3000

// Setup database 
const mongoose = require('mongoose')
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

app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false 
    })
  )
 
// POST Parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(methodOverride('_method'))


// Custom authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/login') // Redirect to login if not authenticated
  }
}


// Test Route //////
app.get('/', (req, res) => {
   res.render('home')
})

// Route Definitions  ////////////////////////////////////////////////
// Routes for login and register
app.get('/login', authController.getLogin)
app.post('/login', authController.postLogin)
app.get('/register', authController.getRegister)
app.post('/register', authController.postRegister)

// Task Route definition
app.use('/tasks', isAuthenticated, taskRoutes)

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

