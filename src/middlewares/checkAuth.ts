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

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err:Error, user:any) => {
        if (err) {
            return res.status(500).send("Internal error");
        }
        if (!user) {
            return res.status(401).send("No access found");
        }
        req.user = user;
        next();
    })(req, res, next);
};
export {checkAuth}