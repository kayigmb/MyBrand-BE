import Express from "express";
import mongoose from "mongoose";
import {router} from "./routes";

const app = Express();

mongoose
    .connect("mongodb+srv://kayigm1:kayigm132@post.kwblqh9.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        app.use(Express.json())
        app.use("/blog", router);

        app.listen(2000, () => {
            console.log("Server has started!");
        });


    })
    .catch((error:Error) => {
        console.error("Error connecting to MongoDB:", error);
    });

