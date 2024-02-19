import express from "express";
import mongoose from "mongoose";
import { router } from "./routers/routes";
import {blogRouter} from "./routers/bRoute";
import { cRouter } from "./routers/cRoute";
import { likeRouter } from "./routers/likeroute";
import { qRouter } from "./routers/qRoute";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

mongoose
    .connect(databaseUrl)
    .then(() => {
        console.log("Connected to MongoDB.");
        
        app.use(express.json());

        // cookie parser secret
        app.use(cookieParser('like'));

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

