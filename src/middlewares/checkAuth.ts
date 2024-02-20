import {NextFunction, Request,Response, response} from 'express'
import passport from 'passport';
import { User } from '../utils/types';
import { UserModel } from '../models/authModel';

const checkAuth = (req:Request, res:Response,next:NextFunction) => {
    try{
        const token = req.query.secret_token;

            if (!token) {

                return res.status(401).send("Unable to find user");
            }

        passport.authenticate('jwt', { session: false })(req, res, next);
    }
         catch (err) {

            console.log(err);

            res.status(404).send("Internal error");

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
            res.status(404).send("Internal error");
        }
}


export {checkAuth,checkAdmin}



