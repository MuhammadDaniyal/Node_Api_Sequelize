const express = require("express");
const router = express.Router();
const postsControllers = require("../controllers/post.controllers");
const { checkAuth } = require("../middleware/check-auth");

// POST
router.route("/post").post(checkAuth, postsControllers.createPost);

// GET
router.route("/posts").get(postsControllers.getAllPosts);
router.route("/post/:id").get(postsControllers.getPost);

// PUT
router.route("/post/:id").patch(checkAuth, postsControllers.updatePost);

// DELETE
router.route("/post/:id").delete(checkAuth, postsControllers.deletePost);

module.exports = router;
