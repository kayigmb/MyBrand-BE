import {NextFunction, Request,Response, response} from 'express'
import passport from 'passport';
import { User } from './types';
import { UserModel } from '../models/authModel';
import {Types}from 'mongoose'
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto"
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT} from 'passport-jwt';
import session from 'express-session';



passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'jwt',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
        
      },
      async (token, done) => {

        try {
          return done(null, token.user);

        } catch (error) {

          done(error);

        } 
      }
    )
  );