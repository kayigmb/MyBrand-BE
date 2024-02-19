import express,{ Request, Response } from "express";
import { Blog } from "../models/blog";
import { v4 as uuidv4 } from 'uuid';
import { Types } from 'mongoose';

const like = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }

        let userId = req.cookies.userId;

        if (!userId) {

            userId = uuidv4();   
                
            res.cookie('userId', userId, { maxAge: 60000 * 60 * 60 * 24 *365});            
        }

        const userIdObject = Types.ObjectId.createFromTime(parseInt(userId, 16));

        const userLikedIndex = blog.likes.findIndex(like => like.user.equals(userIdObject));

        if (userLikedIndex === -1) {
            blog.likes.push({ user: userIdObject });
            await blog.save();
            res.status(200).send('Blog post liked ');
        } else {
            blog.likes.splice(userLikedIndex, 1);
            await blog.save();
            res.status(200).send('Blog post unliked');
        }
    } catch (error) {
        console.error("Internal error:", error);
        res.status(500).send({ error: "Error with liking" });
    }
}

export { like };
