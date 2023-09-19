const express = require('express');
const router = express.Router();

const friendsController = require('../controllers/friendsController') 

router.get('/friends', friendsController.renderFriendsPage)
router.post('/search-friends', friendsController.searchFriends)

module.exports = router
