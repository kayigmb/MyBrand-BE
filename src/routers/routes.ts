import express, { NextFunction, Request,Response, Router } from 'express';
import {blogGet,blogPost,blogUpdate,blogDelete,blogShow}  from '../controllers/controller'
import { commentPost,commentShow} from '../controllers/controllerComment';
import { messageCreate,messageShow } from '../controllers/queryController';
import {like,likeShow} from '../controllers/likeController'
import passport from 'passport';
import '../controllers/authentication'
import {validBlog,validUser,validMessage,validComments} from '../middlewares/valid'
// import { registerAdmin} from '../controllers/authentication';
// import '../utils/jwt'
import Jwt from 'jsonwebtoken'
import { checkAuth,checkAdmin } from '../middlewares/checkAuth';
import '../utils/passport'
import { upload } from '../utils/multer';

const router = express.Router();



// Blog Controllers 
router.get("/blogs", blogShow);


// Get the information
router.get("/blogs/:id", blogGet);

// Post a new blog

//validBLog
router.post("/blogs",checkAuth,upload.single('image'),blogPost);

// Update blog
router.patch("/blogs/:id",checkAuth,blogUpdate);

// delete blog
router.delete("/blogs/:id",checkAuth, blogDelete);


//Comment router

// get comments from id
router.get("/blogs/:id/comments",commentShow)

//create post 
router.post("/blogs/:id/comments",validComments,commentPost)


// QUERY ROUTER  

// query show 
router.get("/queries",checkAuth,checkAdmin,messageShow) // can be read by only the admin

// query create
router.post("/queries",validMessage,messageCreate);


//Likes

//like create
router.put("/blogs/:id/likes",checkAuth, like)
router.get("/blogs/:id/likes", likeShow)


//sign up and login 

router.get('/protected',
  checkAuth,
      (req:Request, res:Response) => {
          res.json({ message: 'You are authorized to access this resource' });
});


router.post('/signup', 
  validUser,
    passport.authenticate('signup', { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
            res.json({
              "message":"Successfully signed up",
              "user":{
                user: req.user
              }
                                
            });
    }
);

router.post("/signin",validUser,(req: Request, res: Response, next: NextFunction) => {

  passport.authenticate('login', { session: false }, (err:any, user:any, info:any) => {
        if (err) {

          return next(err);

        }
        

        if (!user) {

          return res.status(401).json({ message: info.message });

        }
        

        const body = { _id: user._id, username: user.username, admin:user.admin };

        const token = Jwt.sign({ user: body }, 'token');
          
        res.status(200).json({
            "message":"Successfully Login",
            "user":{
              username: user?.username,
              admin: user?.admin,
              token: token
          }
        })
        
  })(req, res, next);
})

// router.post('/admin', registerAdmin)
export {router}

