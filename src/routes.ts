import express, { Router } from 'express';
import {Blog} from "./models/blog";
import {Comment} from "./models/comment";
import {blogGet,blogPost,blogUpdate,blogDelete,blogShow}  from './controller'
import {commentPost,commentShow} from './controllerComment'


const router = express.Router();

// Blog Controllers 
router.get("/blog", blogShow);


// Get the information
router.get("/blog/:id", blogGet);

// Post a new blog
router.post("/blog",blogPost);

// Update blog
router.patch("/blog/update/:id",blogUpdate);

// delete blog

router.delete("/blog/delete/:id", blogDelete);


export {router}

