import {NextFunction, Request,Response, response} from 'express'
import passport from 'passport';
import { User } from '../utils/types';
import { UserModel } from '../models/authModel';
import {Types}from 'mongoose'

const checkAuth = (req:Request, res:Response,next:NextFunction) => {
    try{
        const token = req.query.secret_token;

            if (!token) {

                return res.status(404).send("Unable to find user");
                
            }

        passport.authenticate('jwt', { session: false })(req, res, next);
    }
         catch (err) {

            console.log(err);

            res.status(500).send("Internal error");

        }
}   



const checkAdmin = async(req:Request, res:Response,next:NextFunction) => {

        try{
            
            const userExist = req.user

            const userExisting = await UserModel.findOne(userExist)

            if(userExisting?.admin === true){
                next()
            }
            else{
                console.error("User not admin")
                res.status(401).send({message:"User is not an admin"})
            }


        }catch(err){
            console.log(err);
            res.status(500).send("Internal error");
        }

}




const checkAccessBlog = async(req:Request, res:Response,next:NextFunction) => {

    try{
      
            const userExist = req.user

            const userExisting = await UserModel.findOne(userExist)

            const id = req.params.id

            const blogId = req.params.id;

            const blog = userExisting?.blogsCreated?.find(blog => blog.toString() === blogId);


            if(userExisting?.admin === true){
                next()
            } else if(blog){
                next()
            }
            else{
                console.error(  "User has no access")
                res.status(401).send({message:"User access denied"})
            }


    }catch(err){
        console.log(err);
        res.status(500).send("Internal error");
    }
}



const userDetails = async (req:Request, res:Response) => {

    try {
  
        const user = req.user;
  
        if (user && 'user' in user) {

            const username = user.user;
  
            const userCreated = await UserModel.findOne({ user: username });
  
            if (userCreated) {  
            //   res.json({
            //         message: 'User Section',
            //         user: user,
            //         blogsCreated: userCreated.blogsCreated
            //     });
                res.status(200).send({message:"USER WELCOME", userCreated,token: req.query.secret_token})
             
            } else {
  
                res.status(404).json({ error: "User unavailable" });

            }

        } else {
  
            res.status(400).json({ error: "Invalid user" });
        }
    } catch (err) {
  
        console.error(err)
        
        res.status(500).json("Internal server error" );
    }

}


export {checkAuth,checkAdmin,userDetails,checkAccessBlog}



