import { Blog } from '../models/blog'
import express, { NextFunction, Request, Response} from 'express'
import { Comment } from '../models/comment';
import { cloudinary} from '../utils/cloudinary';
import { UserModel } from '../models/authModel';
import { upload } from '../utils/multer';
import { validateBlog } from '../utils/validation';
import { User } from '../utils/types';
import { Console } from 'console';


// blog show
const blogShow = async (req:Request, res:Response) => {
    const blogs = await Blog.find();
    if (!blogs){    
        return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blogs);
}


// blog Get
const blogGet = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id });
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Internal server error" });
    }
};


// Blog delete
const blogDelete = async (req:Request, res:Response) => {
    try {
        const blogId = req.params.id;

        const blogDelete = await Blog.findByIdAndDelete(blogId);
        
        await Comment.deleteMany({blog:blogId});
    
        if (!blogDelete) {
            return res.status(404).json({ error: "Blog not found" });
           
        }

        res.status(200).json("BLOG SUCCESSFULLY DELETED ");
        
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        
    }
}


// Post a new blog

const blogPost = async (req:Request, res:Response) => {
    try {
        const {error,value} = validateBlog(req.body);

        if (error) {
            return res.status(404).json({ error: error.details[0].message });

        } 

        const { title,content } = value;

        const blogDB = await Blog.findOne({ title });
       
        const userExist = req.user as User;
        
        if (!req.file) return res.status(403).send({ error: "Error uploading, file not found" });
        const resultFile = await cloudinary.uploader.upload(req.file.path);

        // console.log(userExist.username)

        if (blogDB) {
            return res.status(409).json("Title already exists");
        }
         else 
        {
            const blog = new Blog({
                title,
                author: userExist?.username,
                image: resultFile.url,
                content,
            });

            await blog.save();
            
            return res.status(200).json(blog);
        }
    } 
    catch (error) {
        console.error("Error creating blog:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};





// Blog Update
const blogUpdate = async (req: Request, res: Response) => {
    try {

        const blog = await Blog.findOne({ _id: req.params.id })

        

        if (!blog) {
            console.log("Blog not found");
            return res.status(404).json({ error: "Blog not found" });
        }
        if(req.body.title){
            blog.title = req.body.title;
        }
        
        if(req.body.content){
            blog.content = req.body.content;
        }

        if(req.file){
            const resultFile=await cloudinary.uploader.upload(req.file.path)
           blog.image=resultFile.url
        }

        const blogDB = await Blog.findOne({title:req.body.title});

        if (blogDB) {
            return res.status(409).json("Title already exists");
        }

        await blog.save();

        console.log("Blog updated successfully:");
        res.status(200).json("Success Updating");

    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


// export the required parameters
export {blogGet,blogPost,blogUpdate,blogDelete,blogShow}

