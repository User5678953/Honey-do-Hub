const mongoose = require('mongoose')
const User = require('../models/userModel')

// Render the friends page
exports.renderFriendsPage = (req, res) => {
    try {
        res.render('friends', { searchResults: [] })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: Could not fetch friends')
    }
}


// Search for friends
exports.searchFriends = async (req, res) => {

    try {
        const searchQuery = req.body.searchUsername
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        //Regex for case-insensitive
        const searchResults = await User.find({ username: new RegExp(searchQuery, 'i') })

        //Display usernames from the database
        res.render('friends', { searchResults: searchResults })

    } catch (error) {
        console.error(error);
        res.status(500).send('No friend with username found')
    }
}

// Add friends
//exports.addFriend = async (req, res) => {
   // try {
// Get the current user
// Add the friend's ID to the user friends array
// Save the updated user info
//res.redirect to friends

//} catch (error) {
       // console.error(error);
       // res.status(500).send('Server error');
   // }


//Then make a an option to assign to friend by adding a dropdown new task ejs that grabs user friends from friends array and populates, when friend is selscted, and form is submitted task data and friend id is sent to the database and updates, now when A friend sees the index of all tasks since the id is associated, they will be anle to see edit and update tasks. 