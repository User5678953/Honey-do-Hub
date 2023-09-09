// IMPORTS
const express = require('express')
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

app.get('/', (req, res) => {
   res.send('Hello world!')
})

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
