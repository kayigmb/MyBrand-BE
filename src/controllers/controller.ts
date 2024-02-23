import { Blog } from '../models/blog'
import express, { NextFunction, Request, Response} from 'express'
import { Comment } from '../models/comment';
import { cloudinary} from '../utils/cloudinary';
import { UserModel } from '../models/authModel';
import { upload } from '../utils/multer';




// blog show
const blogShow = async (req:Request, res:Response) => {
    const blogs = await Blog.find();
    if (!blogs){    
        return res.status(404).send({ error: "Blog not found" });
    }
    console.log(req.user)

    res.status(200).send(blogs);
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
        res.status(200).send();
        
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
}



// Post a new blog
const blogPost = async (req:Request, res:Response) => {
    try {
        upload.single('image')(req, res, async (err) => {
            try {
                if (err) return res.status(500).send({ error: err});

                if (!req.file) return res.status(403).send({ error: "Error uploading, file not found" });

                const resultFile = await cloudinary.uploader.upload(req.file.path);

                const { title, content } = req.body;

                const blogDB = await Blog.findOne({ title });

                const userExist = req.user;
                const userExisting = await UserModel.findOne(userExist);
   
                if (blogDB) {
                    return res.status(409).send("Title already exists");
                } else {
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
            } catch (error) {
                console.error("Error creating blog:", error);
                return res.status(500).send({ error: "Internal server error" });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal server error" });
    }
};


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
        res.status(200).send(blog);
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}


// export the required parameters
export {blogGet,blogPost,blogUpdate,blogDelete,blogShow}

