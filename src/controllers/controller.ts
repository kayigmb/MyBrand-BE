import { Blog } from '../models/blog'
import express, { NextFunction, Request, Response} from 'express'
import { Comment } from '../models/comment';
import { cloudinary } from '../utils/cloudinary';
import { Readable } from 'stream';
import { User } from '../utils/types';
import { UserModel } from '../models/authModel';
import { upload } from '../utils/multer';


// blog show
const blogShow = async (req:Request, res:Response) => {
    const blogs = await Blog.find();
    if (!blogs){    
        return res.status(404).send({ error: "Blog not found" });
    }
    res.send(blogs);
}


// blog Get
const blogGet = async (req:Request, res:Response) => {
    try {   
        const blog = await Blog.findOne({ _id: req.params.id });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.send(blog);
    } catch (error) {
         res.status(500).send({ error:"Internal server error" });
    }
}


// Blog delete
const blogDelete = async (req:Request, res:Response) => {
    try {
        const blogId = req.params.id;

        const blogDelete = await Blog.findByIdAndDelete(blogId);
        
        await Comment.deleteMany({blog:blogId});
    
        if (!blogDelete) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.status(204).send();
        
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
}

// Post a new blog
const blogPost = async (req: Request, res: Response) => {
    try {
        const { title,image,content } = req.body;
        const blogDB = await Blog.findOne({title:title})
        
        
        const userExist = req.user
        const userExisting = await UserModel.findOne(userExist)

        // if(!req.file){
        //     return res.status(404).json({ error: "no file" });
        // }
        // const result = await cloudinary.uploader.upload(req.file.path)

        if(blogDB) {
            res.status(409).send("title was used before")
        }
        else 
        {
            const blog = new Blog({
                title,
                author: userExisting?.user,
                // image:result.secure_url,
                image,
                content,
            });

            await blog.save();

            res.status(201).json(blog);
        }
    } catch (error) {
        console.error("Error creating blog:", error);

        res.status(500).send({ error: "Internal server error" });
    }
}


// Blog Update
const blogUpdate = async (req: Request, res: Response) => {
    try {
        console.log("Updating blog with ID:", req.params.id);
        
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!blog) {
            console.log("Blog not found");
            return res.status(404).send({ error: "Blog not found" });
        }
        
        console.log("Blog updated successfully:", blog);
        res.send(blog);
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}


// export the required parameters
export {blogGet,blogPost,blogUpdate,blogDelete,blogShow}

