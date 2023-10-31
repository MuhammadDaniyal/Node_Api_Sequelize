const express = require("express");
const imageController = require("../controllers/image.controller");
const { checkAuth } = require("../middleware/check-auth");
const imageUploader = require("../helper/image-uploader");
const router = express.Router();

// POST
router
  .route("/upload")
  .post(
    checkAuth,
    imageUploader.upload.single("image"),
    imageController.uploadImage
  );

module.exports = router;
