"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogShow = exports.blogDelete = exports.blogUpdate = exports.blogPost = exports.blogGet = void 0;
const blog_1 = require("./models/blog");
// const comments = require('./models/comments')
const blogShow = async (req, res) => {
    const blogs = await blog_1.Blog.find();
    res.send(blogs);
};
exports.blogShow = blogShow;
const blogGet = async (req, res) => {
    try {
        const blog = await blog_1.Blog.findOne({ _id: req.params.id });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.send(blog);
    }
    catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
};
exports.blogGet = blogGet;
const blogDelete = async (req, res) => {
    try {
        const blog = await blog_1.Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
};
exports.blogDelete = blogDelete;
const blogPost = async (req, res) => {
    try {
        const blog = new blog_1.Blog({
            title: req.body.title,
            author: req.body.author,
            // comments:req.body.comment,
            image: req.body.image,
            content: req.body.content
        });
        await blog.save();
        res.status(201).send(blog);
    }
    catch (error) {
        res.status(400).send({ error: "Internal server error" });
    }
};
exports.blogPost = blogPost;
const blogUpdate = async (req, res) => {
    try {
        const blog = await blog_1.Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.send(blog);
    }
    catch (error) {
        res.status(400).send({ error: "Internal server error" });
    }
};
exports.blogUpdate = blogUpdate;
