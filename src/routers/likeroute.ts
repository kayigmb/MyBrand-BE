import express, { Router } from 'express';
import {like} from '../controllers/likeController'

const router = express.Router();


//Likes

//like create and uncreate

router.put("/blogs/:id/likes", like)



export const  likeRouter = router