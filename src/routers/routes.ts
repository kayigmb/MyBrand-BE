import express, { NextFunction, Request,Response, Router } from 'express';
import {blogGet,blogPost,blogUpdate,blogDelete,blogShow}  from '../controllers/controller'
import { commentPost,commentShow} from '../controllers/controllerComment';
import { messageCreate,messageShow } from '../controllers/queryController';
import {like,likeShow} from '../controllers/likeController'
import passport from 'passport';
import '../middlewares/auth'
import {vBlog,vUser,vMessage,vComments} from '../middlewares/valid'


const router = express.Router();

// import { genPassword } from '../passport/passportUtils';

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


//Comment router

// get comments from id
router.get("/blogs/:id/comments",commentShow)

//create post 
router.post("/blogs/:id/comments",vComments,commentPost)


// QUERY ROUTER  

// query show 
router.get("/queries", messageShow)
// query create
router.post("/queries",vMessage,messageCreate);


//Likes

//like create
router.put("/blogs/:id/likes", like)
router.get("/blogs/:id/likes", likeShow)

//sign up and login 



router.post(
    '/signup',vUser,
    passport.authenticate('signup', { session: false }),
    async (req: Request, res: Response) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
  );

import { loginJwt } from '../utils/jwt';
router.post("/signin",vUser,loginJwt);

// router.post("/logout",logout);

router.get(
    '/user',
    passport.authenticate('jwt', { session: false }),(req, res, next) => {
      res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
      })
    }
  );

export {router}

