"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentShow = exports.commentPost = void 0;
const comment_1 = require("../models/comment");
const blog_1 = require("../models/blog");
const commentShow = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blog_1.Blog.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        const comments = await comment_1.Comment.find({ blog: blogId });
        res.send(comments);
    }
    catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
exports.commentShow = commentShow;
const commentPost = async (req, res) => {
    try {
        const { blogId, name, email, comment } = req.body;
        const blog = await blog_1.Blog.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        const newComment = new comment_1.Comment({
            name,
            email,
            comment
        });
        await newComment.save();
        res.status(201).send(newComment);
    }
    catch (error) {
        console.error("Error posting comment:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
exports.commentPost = commentPost;
