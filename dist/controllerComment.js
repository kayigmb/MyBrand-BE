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
exports.commentShow = exports.commentPost = void 0;
const comment_1 = require("./models/comment");
const blog_1 = require("./models/blog");
const commentShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const blog = yield blog_1.Blog.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        const comments = yield comment_1.Comment.find({ blog: blogId });
        res.send(comments);
    }
    catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});
exports.commentShow = commentShow;
const commentPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId, name, email, comment } = req.body;
        const blog = yield blog_1.Blog.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        const newComment = new comment_1.Comment({
            name,
            email,
            comment
        });
        yield newComment.save();
        res.status(201).send(newComment);
    }
    catch (error) {
        console.error("Error posting comment:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});
exports.commentPost = commentPost;
