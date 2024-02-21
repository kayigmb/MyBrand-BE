import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../controllers/authentication';
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/authModel';
import bcrypt from 'bcrypt';
import '../utils/jwt'



const customFields = {
  usernameField: 'username',
  passwordField: 'password'
};

const verifyCallback = async (username: string, password: string, done: Function) => {
  try {
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Wrong password' });
    }
  } catch (err) {
    console.error(err);
    return done(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);