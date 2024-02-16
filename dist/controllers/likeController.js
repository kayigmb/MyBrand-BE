"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlike = exports.like = void 0;
const blog_1 = require("../models/blog");
const like = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blog_1.Blog.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "blog not found" });
        }
        blog.likes = 0;
        if (blog.likes !== undefined) {
            blog.likes++;
        }
        else {
            blog.likes++;
        }
        await blog.save();
        res.status(200).send({ message: "Blog liked successfully", likes: blog.likes });
    }
    catch (error) {
        console.error("Error liking blog:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
exports.like = like;
const unlike = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blog_1.Blog.findById(blogId);
        if (!blog) {
            return res.status(404).send({ error: "blog not found" });
        }
        if (blog.likes !== undefined && blog.likes > 0) {
            blog.likes -= 1;
        }
        else {
            blog.likes = 0;
        }
        await blog.save();
        res.status(200).send({ message: "Blog unliked successfully", likes: blog.likes });
    }
    catch (error) {
        console.error("Error liking blog:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
exports.unlike = unlike;
