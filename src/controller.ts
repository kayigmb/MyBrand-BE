import { Blog } from './models/blog'
import { Request, Response} from 'express'
// const comments = require('./models/comments')

const blogShow = async (req:Request, res:Response) => {
    const blogs = await Blog.find();
    res.send(blogs);
}

const blogGet = async (err:Error, req:Request, res:Response) => {
    try {   
        const blog = await Blog.findOne({ _id: req.params.id });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.send(blog);
    } catch (error) {
         res.status(500).send({ error: "Internal server error" });
    }
}


const blogPost = async (req:Request, res:Response) => {
    try {
        // console.log(req.body)
        const blog = new Blog({
            title: req.body.title,
            author: req.body.author,
            // comments:req.body.comment,
            image: req.body.image,
            content: req.body.content

        });
        await blog.save();
        res.status(201).send(blog);
    } catch (error) {
        res.status(400).send({ error: "Internal server error" });
    }
}

const blogUpdate = async (req:Request, res:Response) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.send(blog);
    } 
    
    catch (error) {
        res.status(400).send({ error: "Internal server error" });
    }
}

const blogDelete = async (req:Request, res:Response) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
}

export {blogGet,blogPost,blogUpdate,blogDelete,blogShow}

