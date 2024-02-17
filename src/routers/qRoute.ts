import { messageCreate,messageShow } from '../controllers/queryController';
import { vMessage } from '../middlewares/mMiddleware';
import express, { Router } from 'express';

const router = express.Router();

// QUERY ROUTER  

// query show 
router.get("/queries", messageShow)
// query create
router.post("/queries",vMessage,messageCreate);

export const qRouter = router