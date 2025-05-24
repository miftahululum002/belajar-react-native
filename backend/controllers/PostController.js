//import prisma client
const { validationResult } = require("express-validator");
const prisma = require("../prisma/client");

//function findPosts
const findPosts = async (req, res) => {
    try {
        //get all posts from database
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                image: true,
                title: true,
                content: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: "Get all posts successfully",
            data: posts,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};
//function createPost
const createPost = async (req, res) => {
    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    try {
        //insert data
        const post = await prisma.post.create({
            data: {
                image: req.file.filename,
                title: req.body.title,
                content: req.body.content,
            },
        });

        res.status(201).send({
            success: true,
            message: "Post created successfully",
            data: post,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { findPosts, createPost };
