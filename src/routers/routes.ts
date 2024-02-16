import express, { Router } from 'express';
import {blogGet,blogPost,blogUpdate,blogDelete,blogShow}  from '../controllers/controller'
import { messageCreate,messageShow } from '../controllers/queryController';
import { commentPost,commentShow } from '../controllers/controllerComment';
import { vComments} from '../middlewares/cMiddleware';
import { vMessage } from '../middlewares/mMiddleware';


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

//router Comment

// query router
    
// query show 
router.get("/query", messageShow)
// query create
router.post("/query",vMessage,messageCreate);

//Comment router
// get comments from id
router.get("/blog/:id/comment",commentShow)
router.post("/blog/:id/comment",vComments,commentPost)



export {router}

