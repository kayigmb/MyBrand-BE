import express, { Router } from 'express';
import {blogGet,blogPost,blogUpdate,blogDelete,blogShow}  from '../controllers/controller'
import { vBlog } from '../middlewares/bMiddleware';


const router = express.Router();

// Blog Controllers 
router.get("/blogs", blogShow);


// Get the information
router.get("/blogs/:id", blogGet);

// Post a new blog
router.post("/blogs",vBlog,blogPost);

// Update blog
router.patch("/blogs/:id",blogUpdate);

// delete blog
router.delete("/blogs/:id", blogDelete);

export const blogRouter = router;