const express = require("express");
const Blog = require("./models/blog");
const router = express.Router();

router.get("/blog", async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
});

router.get("/blog/:id", async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.send(blog);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post("/blog", async (req, res) => {
    try {
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content
        });
        await blog.save();
        res.status(201).send(blog);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.patch("/blog/:id", async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.send(blog);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete("/blog/:id", async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
