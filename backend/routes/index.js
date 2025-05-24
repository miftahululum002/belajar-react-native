//import express
const express = require("express");

//init express router
const router = express.Router();

//import middleware upload
const upload = require("../middlewares/upload");

//import validators
const { validatePost } = require("../utils/validators/post");

//import post controller
const postController = require("../controllers/PostController");

//define route for posts
router.get("/posts", postController.findPosts);

//define route for post create
router.post(
    "/posts",
    upload.single("image"),
    validatePost,
    postController.createPost
);

//export router
module.exports = router;
