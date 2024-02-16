"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.like = void 0;
const blog_1 = require("../models/blog");
const like = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blog_1.Blog.findById(blogId);
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        blog.likes += 1;
        await blog.save();
        res.status(200).send({ message: "Blog liked successfully", likes: blog.likes });
    }
    catch (error) {
        console.error("Error liking blog:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
exports.like = like;
