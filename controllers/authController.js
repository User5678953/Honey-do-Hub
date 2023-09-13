const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

// Login form route
exports.getLogin = (req, res) => {
    res.render('login')
}

// Login post route
exports.postLogin = async (req, res) => {
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
        res.status(500).send('An error occurred while processing your request.');
    }
};

// Registration form route
exports.getRegister = (req, res) => {
    res.render('register')
}

// Registration post route
exports.postRegister = async (req, res) => {
    try {
        const { username, password } = req.body

        // Hash the password before storing it
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        // Create a new user in your database
        const newUser = await User.create({ username, password: hashedPassword })

        // Create a session for the newly registered user
        req.session.currentUser = newUser;
        res.redirect('/tasks')
    } catch (err) {
        console.error(err)
        res.status(500).send('An error occurred while processing your request.')
    }
}

module.exports = router
