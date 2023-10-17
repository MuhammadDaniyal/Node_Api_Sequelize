const express = require('express')
const postsControllers = require('../controllers/post.controllers')
const router = express.Router()

router.route('/posts').get(postsControllers.index)

module.exports = router