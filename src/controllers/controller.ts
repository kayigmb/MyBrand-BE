import { Blog } from '../models/blog'
import express, { NextFunction, Request, Response} from 'express'
import { Comment } from '../models/comment';
import { cloudinary} from '../utils/cloudinary';
import { UserModel } from '../models/authModel';
import { upload } from '../utils/multer';
import { validateBlog } from '../utils/validation';



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

        const userExist = req.user;
        const userExisting = await UserModel.findOne(userExist);

        if (!req.file) return res.status(403).send({ error: "Error uploading, file not found" });
        const resultFile = await cloudinary.uploader.upload(req.file.path);

        if (blogDB) {
            return res.status(409).json("Title already exists");
        }
         else 
        {
            const blog = new Blog({
                title,
                author: userExisting?.username,
                image: resultFile.url,
                content,
            });

            await blog.save();

            // Update user's blogsCreated array
            userExisting?.blogsCreated?.push(
                blog.id
            );
            await userExisting?.save();

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
        console.log("Updating blog with ID:", req.params.id);
        
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!blog) {
            console.log("Blog not found");
            return res.status(404).json({ error: "Blog not found" });
        }
        
        console.log("Blog updated successfully:", blog);
        res.status(200).json(blog);
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


// export the required parameters
export {blogGet,blogPost,blogUpdate,blogDelete,blogShow}

