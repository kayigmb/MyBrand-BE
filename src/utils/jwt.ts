import express,{Request,Response,NextFunction} from 'express'
import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../middlewares/auth'

const loginJwt = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('signin', async (err: Error, user: any) => {
        try {
            if (err || !user) {
                return res.status(401).json({ message: 'Username Required' });
            }

            req.login(user, { session: false }, async (error) => {
                if (error) {
                    return next(error);
                }

                const body = { _id: user._id, user: user.user };
                const token = jwt.sign({ user: body }, 'accessToken');

                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};

export { loginJwt };

