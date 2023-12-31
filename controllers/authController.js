const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/userModel')


// Render Home Page
router.get('/', (req, res) => {
    res.render('login')
})

// Login form route
router.get('/login', (req, res) => {
    res.render('login')
})

// register route form route
router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    try {
      
    const existingUser = await User.findOne({ username: req.body.username })
      if (existingUser) {
      return res.status(400).send('Username already exists. Please choose another one.')
    }
    console.log('before hash: ', req.body)
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    console.log('after hash: ', req.body)
    const newUser = await User.create(req.body)
    req.session.currentUser = newUser
    res.redirect('/tasks')
  } catch (err) {
    console.log(err)
      res.status(500).send('Please try a different username or password. Use the back button in your browser to return')
  }
})

// Login post route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        // Find the user by their username in your database
        const foundUser = await User.findOne({ username })

        if (foundUser) {
            // Check if the password matches
            const isAMatch = bcrypt.compareSync(password, foundUser.password)

            if (isAMatch) {
                console.log('Login successful')
                
                // Create a session for the authenticated user
                req.session.currentUser = foundUser
                res.redirect('/tasks') 
            } else {
                res.status(401).send('Invalid username or password.')
            }
        } else {
            res.status(401).send('Invalid username or password.')
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('An error occurred while processing your request.')
    }
})

module.exports = router
