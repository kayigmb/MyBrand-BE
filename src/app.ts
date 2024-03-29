 
import express, {NextFunction, Request,Response} from "express";
import mongoose from "mongoose";
import { router } from "./routers/routes";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import session from 'express-session';
import cookieParser from 'cookie-parser'
import passport from "passport";
import './utils/passport' 
import documentation from './utils/swagger.json'
import swaggerUi from  "swagger-ui-express";
import cors from 'cors'
const app = express()


app.use(express.json());

app.use(session({
        secret: 'jwt', 
        resave: false,
        saveUninitialized: true
}));  


app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(documentation));

app.use(passport.initialize()); // don't touch for real

app.use(passport.session());
app.use(cookieParser());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: false})) 

app.use(cors())

app.use("/api", router);
        


export {app}