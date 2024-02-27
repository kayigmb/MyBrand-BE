import passport from 'passport';
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';




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


