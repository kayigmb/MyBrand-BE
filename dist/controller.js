"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogShow = exports.blogDelete = exports.blogUpdate = exports.blogPost = exports.blogGet = void 0;
const blog_1 = require("./models/blog");
// const comments = require('./models/comments')
const blogShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_1.Blog.find();
    res.send(blogs);
});
exports.blogShow = blogShow;
const blogGet = (err, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_1.Blog.findOne({ _id: req.params.id });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.send(blog);
    }
    catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});
exports.blogGet = blogGet;
const blogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body)
        const blog = new blog_1.Blog({
            title: req.body.title,
            author: req.body.author,
            // comments:req.body.comment,
            image: req.body.image,
            content: req.body.content
        });
        yield blog.save();
        res.status(201).send(blog);
    }
    catch (error) {
        res.status(400).send({ error: "Internal server error" });
    }
});
exports.blogPost = blogPost;
const blogUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_1.Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.send(blog);
    }
    catch (error) {
        res.status(400).send({ error: "Internal server error" });
    }
});
exports.blogUpdate = blogUpdate;
const blogDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_1.Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});
exports.blogDelete = blogDelete;
