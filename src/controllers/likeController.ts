import express,{ Request, Response } from "express";
import { Blog } from "../models/blog";
import { v4 as uuidv4 } from 'uuid';
import { Types } from 'mongoose';
import { UserModel } from "../models/authModel";

const like = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }

        const userId = req.user;

        if (!userId) {
            return res.status(404).send({ error: "User not found" });
        }

        const userExisting = await UserModel.findOne(userId);

        if (!userExisting) {

            return res.status(404).send({ error: "User not found" });
        }

  
        const blogLikes = blog.likes as Types.ObjectId[];

        const userLikedIndex = blogLikes.findIndex((user) => user.equals(userExisting._id));

        if (userLikedIndex === -1) {
            blogLikes.push(userExisting._id);
            await blog.save();
            res.status(200).json('Blog post liked ');
        } else {
            blogLikes.splice(userLikedIndex, 1);
            await blog.save();
            res.status(200).json('Blog post unliked');
        }
    } catch (error) {
        console.error("Internal error:", error);
        res.status(500).send({ error: "internal server error" });
    }
}

const likeShow = async (req:Request, res:Response) => {
    try{
        console.log(req.user)
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        
        const likes = blog.likes.length;
        res.status(200).json({ likes});
        
    }catch (error) {
        console.log(error);
        res.status(404).send('error finding likes count');

    }
}


export { like, likeShow};
