import {NextFunction, Request,Response, response} from 'express'
import passport from 'passport';
import { User } from '../utils/types';
import { UserModel } from '../models/authModel';
import {Types}from 'mongoose'
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto"
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT} from 'passport-jwt';
import session from 'express-session';


// const checkAuth = (req:Request, res:Response,next:NextFunction) => {
//     try{
//         const token = req.query.secret_token;

//             if (!token) {

//                 return res.status(404).send("Unable to find user");
                
//             }

//         passport.authenticate('jwt', { session: false })(req, res, next);
//     }
//          catch (err) {

//             console.log(err);

//             res.status(500).send("Internal error");

//         }
// }   

const checkAuth = (req:Request, res:Response,next:NextFunction) => {
                
            if(req.isAuthenticated()){
                return next();
            }
            else{
                res.status(401).send("No access found");
            }
}

export {checkAuth}