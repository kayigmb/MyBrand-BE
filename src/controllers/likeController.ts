import { Request, Response } from "express";
import { Blog } from "../models/blog";


const like = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).send({ error: "blog not found" });
        }

        if (blog.likes !== undefined) {
            blog.likes += 1;
        } else {
            blog.likes = 0;
        }

        await blog.save();

        res.status(200).send({ message: "Blog liked successfully", likes: blog.likes });
    } catch (error) {
        console.error("Error liking blog:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};

const unlike = async(req:Request,res:Response)=>{
 try {
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).send({ error: "blog not found" });
        }

        if (blog.likes !== undefined && blog.likes > 0) {
            blog.likes -= 1;
        } else {
            blog.likes = 0;
        }

        await blog.save();

        res.status(200).send({ message: "Blog unliked successfully", likes: blog.likes });
    } catch (error) {
        console.error("Error liking blog:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}   



export { like,unlike};
