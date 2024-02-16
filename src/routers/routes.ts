import express, { Router } from 'express';
import {blogGet,blogPost,blogUpdate,blogDelete,blogShow}  from '../controllers/controller'
import { messageCreate,messageShow } from '../controllers/queryController';
import { commentPost,commentShow } from '../controllers/controllerComment';
import { vComments} from '../middlewares/cMiddleware';
import { vMessage } from '../middlewares/mMiddleware';
import { vBlog } from '../middlewares/bMiddleware';
import {like,unlike} from '../controllers/likeController'


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

// QUERY ROUTER  

// query show 
router.get("/queries", messageShow)
// query create
router.post("/queries",vMessage,messageCreate);

//Comment router

// get comments from id
router.get("/blogs/:id/comments",commentShow)

//create post 
router.post("/blogs/:id/comments",vComments,commentPost)

//Likes

//like create
router.put("/blogs/:id/likes", like)

//like delete
router.delete("/blogs/:id/likes",unlike)


export {router}

