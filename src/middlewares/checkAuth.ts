import {NextFunction, Request,Response, response} from 'express'
import passport from 'passport';
import { User } from '../utils/types';
import { UserModel } from '../models/authModel';
import {Types}from 'mongoose'
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto"
import session from 'express-session';
import Jwt from 'jsonwebtoken';


const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    
    passport.authenticate('jwt', { session: false }, (err:Error, user:any, info:any) => {
    
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized Access' });
            }
            req.user = user;
        next();
    })(req, res, next);
  

};

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    
    passport.authenticate('jwt', { session: false }, (err:Error, user:any, info:any) => {

            if (!user) {
                return res.status(404).json({ message: 'Invalid User' });
            }

            if(!user.admin === true) {
                return res.status(401).json({ message: 'Only Admin access' });
            }

        next();
    })(req, res, next);
  

};

const checkBlogAuth = async (req:Request, res:Response, next:NextFunction) => {

    passport.authenticate('jwt', { session: false }, (err:Error, user:any, info:any) => {
        
        if(!user?.admin === true && !user.blogs.includes(req?.params.id)) {
                
                return res.status(401).json({ message: 'Unauthorized access to this action' });
        }

        next();
    })(req, res, next);

}

export {checkAuth,checkAdmin,checkBlogAuth}


  