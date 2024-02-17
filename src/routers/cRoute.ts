import express, { Router } from 'express';
import { commentPost,commentShow} from '../controllers/controllerComment';
import { vComments} from '../middlewares/cMiddleware';


const router = express.Router();

//Comment router

// get comments from id
router.get("/blogs/:id/comments",commentShow)

//create post 
router.post("/blogs/:id/comments",vComments,commentPost)

export const cRouter = router;