 
import express, {NextFunction, Request,Response} from "express";
import mongoose from "mongoose";
import { router } from "./routers/routes";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import session from 'express-session';
import cookieParser from 'cookie-parser'
import passport from "passport";
import './utils/passport' 


const app = express()
app.use(express.json());

app.use(session({
        secret: 'jwt', 
        resave: false,
        saveUninitialized: true
}));  

const options = {
    definition: {
        openApi: "3.0.0",
        info: {
            title: "Your API Title",
            version: "1.0.0",
            description: "Your API Description",
        },
        servers: [{
            url: "http://localhost:3000"
        }]
    },
    apis: ["./routes/*.ts"]
};

// const spacs =  swaggerJSDocs(options);

// app.use('/swagger',
//         swaggerUi.serve,
//         swaggerUi.setup(spacs)    
// );

app.use(passport.initialize()); // don't touch
app.use(passport.session());
app.use(cookieParser());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: false})) 

//Routers 
app.use("/api", router);
        


export {app}