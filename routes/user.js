const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

// POST
router.route("/user/signup").post(userController.signUpUser);
router.route("/user/login").post(userController.loginUser);

module.exports = router