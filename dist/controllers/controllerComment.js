"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentShow = exports.commentPost = void 0;
const comment_1 = require("../models/comment");
const blog_1 = require("../models/blog");
// comments show
const commentShow = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blog_1.Blog.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "Comment not found" });
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
// Comment Post
const commentPost = async (req, res) => {
    try {
        const { name, email, commentText } = req.body;
        const blogId = req.params.id;
        const blog = await blog_1.Blog.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "blog not found" });
        }
        const newComment = new comment_1.Comment({
            name,
            email,
            comment: commentText,
            blog: blog._id
        });
        await newComment.save();
        if (blog.comments !== undefined) {
            blog.comments.push(newComment._id);
            await blog.save();
        }
        res.status(201).send(newComment);
    }
    catch (error) {
        console.error("Error posting comment:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
exports.commentPost = commentPost;
