import express, { Router } from 'express';
import {blogGet,blogPost,blogUpdate,blogDelete,blogShow}  from '../controllers/controller'
import { messageCreate,messageShow } from '../controllers/queryController';
import { vMessage } from '../middlewares/mMiddleware';
import {like,unlike} from '../controllers/likeController'


const router = express.Router();

// QUERY ROUTER  

// query show 
router.get("/queries", messageShow)
// query create
router.post("/queries",vMessage,messageCreate);


//Likes

//like create
router.put("/blogs/:id/likes", like)

//like delete
router.delete("/blogs/:id/likes",unlike)


export {router}

