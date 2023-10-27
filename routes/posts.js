const express = require('express')
const postsControllers = require('../controllers/post.controllers')
const router = express.Router()

// POST
router.route('/post').post(postsControllers.createPost)

// GET
router.route('/posts').get(postsControllers.getAllPosts)
router.route('/post/:id').get(postsControllers.getPost)

// PUT
router.route('/post/:id').patch(postsControllers.updatePost)

// DELETE
router.route('/post/:id').delete(postsControllers.deletePost)

module.exports = router