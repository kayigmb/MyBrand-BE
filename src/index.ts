import express from "express";
import mongoose from "mongoose";
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

        app.use(cookieParser('like'));

        app.use("/api", blogRouter);
        app.use("/api", cRouter);
        app.use("/api", qRouter);
        app.use("/api", likeRouter);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    });

