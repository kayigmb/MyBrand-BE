import {Comment}  from '../models/comment';
import { Blog } from '../models/blog';
import { Request, Response } from 'express';


const commentShow = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;

        const blog = await Blog.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }

        const comments = await Comment.find({ blog: blogId });
        res.send(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}

const commentPost = async (req: Request, res: Response) => {
    try {
        const { blogId, name, email, comment } = req.body;

        const blog = await Blog.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }

        const newComment = new Comment({
            name,
            email,
            comment
        });
        await newComment.save();

        res.status(201).send(newComment);
    } catch (error) {
        console.error("Error posting comment:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}

export { commentPost, commentShow };
