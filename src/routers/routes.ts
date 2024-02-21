import express, { NextFunction, Request,Response, Router } from 'express';
import {blogGet,blogPost,blogUpdate,blogDelete,blogShow}  from '../controllers/controller'
import { commentPost,commentShow} from '../controllers/controllerComment';
import { messageCreate,messageShow } from '../controllers/queryController';
import {like,likeShow} from '../controllers/likeController'
import passport from 'passport';
import flash from 'express-flash';
import '../controllers/authentication'
import {vBlog,vUser,vMessage,vComments} from '../middlewares/valid'
import { registerUser,registerAdmin,login } from '../controllers/authentication';
import '../utils/jwt'
import Jwt from 'jsonwebtoken'
import { checkAuth } from '../middlewares/checkAuth';

const router = express.Router();



// Blog Controllers 
router.get("/blogs",checkAuth, blogShow);


// Get the information
router.get("/blogs/:id", blogGet);

// Post a new blog

// vBlog

router.post("/blogs",blogPost);

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

// , messageShow

router.get("/queries",messageShow) // can be read by only the admin

// query create
router.post("/queries",vMessage,messageCreate);


//Likes

//like create
router.put("/blogs/:id/likes", like)
router.get("/blogs/:id/likes", likeShow)

//sign up and login 


router.post("/signup",registerUser)

router.post("/signupadmin",registerAdmin)


router.post("/signin",(req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err:any, user:any, info:any) => {
      if (err) {
        return next(err);
      }
      
      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      const body = { _id: user._id, email: user.username };
      const token = Jwt.sign({ user: body }, 'TOP_SECRET');
      
      res.status(200).json({
       username: user?.username,
       admin: user?.admin,
       id:user?.id,
       token: token
      })
    })(req, res, next);
  }
)

router.get("/protected-route", checkAuth, (req, res) => {
    res.send("You have access to this protected route");
});

router.get('/user/',)

export {router}

