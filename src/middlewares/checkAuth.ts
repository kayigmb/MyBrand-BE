import {NextFunction, Request,Response} from 'express'
import passport from 'passport';


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

export {checkAuth}



