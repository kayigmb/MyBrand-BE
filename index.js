const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

mongoose
    .connect("mongodb+srv://kayigm1:kayigm132@post.kwblqh9.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {

        app.use("/api", routes);

        app.listen(5000, () => {
            console.log("Server has started!");
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
