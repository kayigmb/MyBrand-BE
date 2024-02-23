import express, {NextFunction, Request,Response} from "express";
import mongoose from "mongoose";
import { router } from "./routers/routes";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import session from 'express-session';
import cookieParser from 'cookie-parser'
import passport from "passport";
import './utils/passport'
import  {app} from "./app";



dotenv.config();


const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

mongoose
    .connect(databaseUrl)
    .then(() => {
        
        console.log("Connected to MongoDB.");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    });

