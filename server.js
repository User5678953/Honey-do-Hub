// IMPORTS
const express = require('express')
const bodyParser = require('body-parser')
const taskRoutes = require('./routes/taskRoutes')
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

// Test Route //////
// app.get('/', (req, res) => {
//    res.send('Hello world!')
// })

// Middleware ////////////////////////////////////////////////
// POST Parsing
app.use(bodyParser.urlencoded({ extend: true }))

// Static Files
app.use(express.static('public'))

// EJS Views
app.set('view engine', 'ejs')

// Basic Error handling
app.use((req, res) => {
  res.status(404).send('404 Not Found')
})

// Task Route definition
app.use(taskRoutes)

// Server Instructions ////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})

 process.on('SIGINT', () => {
     console.log('\nServer is shutting down...')
     server.close(() => {
       console.log('Server has been closed.')
       process.exit(0);
     })
   })
