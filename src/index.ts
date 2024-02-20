import express from "express";
import mongoose from "mongoose";
import { router } from "./routers/routes";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import session from 'express-session';
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();

const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

mongoose
    .connect(databaseUrl)
    .then(() => {
        console.log("Connected to MongoDB.");
        
        app.use(express.json());

        app.use(session({
            secret: 'user', 
            resave: false,
            saveUninitialized: false
        }));  
        app.use(cookieParser());  

        app.use(bodyParser.urlencoded({ extended: false }));

        //Routers 
        app.use("/api", router);
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    });

