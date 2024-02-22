import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import { JwtPayload } from './types';
import { UserModel } from '../models/authModel';
import bcrypt from 'bcrypt';
import '../utils/jwt'



const options = {
  jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey : 'token'
}


const verify =  async (token:any, done:any) => {
    try {

      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  } 


passport.use(
  new JWTstrategy(options,verify)

)


