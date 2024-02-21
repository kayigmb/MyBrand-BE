import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel,isValidPassword } from "../models/authModel";
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT} from 'passport-jwt';


// sign up
// ...

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'username', 
      passwordField: 'password',
      passReqToCallback: true 
    },
    async (req, username, password, done) => {
      const { admin } = req.body;

      try {
        const newUser = await UserModel.create({ username, password, admin });
        return done(null, newUser);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  'signupAdmin',
  new LocalStrategy(
    {
      usernameField: 'username', 
      passwordField: 'password',
      passReqToCallback: true 
    },
    async (req, username, password, done) => {
      const { admin } = req.body;

      try {
        const newUser = await UserModel.create({ username, password, admin:true });
        return done(null, newUser);
      } catch (error) {
        done(error);
      }
    }
  )
);




// login

passport.use(
    'signin',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const existingUser = await UserModel.findOne({ username});
                if (!existingUser) {
                    return done(null, false, { message: 'User not found' });
                }
                const isValid = await isValidPassword(existingUser, password); 
                if (!isValid) {
                    return done(null, false, { message: 'Wrong password' });
                }
                return done(null, existingUser, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error); 
            }
        }
    )
);



passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'accessToken',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
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