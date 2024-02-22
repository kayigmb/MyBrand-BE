import {NextFunction, Request,Response, response} from 'express'
import passport from 'passport';
import { User } from './types';
import { UserModel } from '../models/authModel';
import {Types}from 'mongoose'
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto"
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT} from 'passport-jwt';
import session from 'express-session';
import Jwt from 'jsonwebtoken';
import {JwtPayload}  from './types';

interface payload{
    username:string,
    password:string
}
const issueJwt = (user:any)=> {
    const _id = user._id
  
    const payload = {
      sub: _id
    };
  
    const signedToken = Jwt.sign(payload,'token');
  
    return {
      token:signedToken
    }
  }

export {issueJwt}