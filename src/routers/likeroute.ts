import express, { Router } from 'express';
import {like,unlike} from '../controllers/likeController'

const router = express.Router();


//Likes

//like create
router.put("/blogs/:id/likes", like)

//like delete
router.delete("/blogs/:id/likes",unlike)

export const  likeRouter = router