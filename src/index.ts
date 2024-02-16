import express from "express";
import mongoose from "mongoose";
import { router } from "./routers/routes";
import { error } from "console";
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

mongoose
    .connect(databaseUrl)
    .then(() => {
        console.log("Connected to MongoDB.");
        app.use(express.json());
        app.use("/blog", router);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    });

// mongodb+srv://kayigm1:kayigm132@post.kwblqh9.mongodb.net/?retryWrites=true&w=majority