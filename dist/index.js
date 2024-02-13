"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
mongoose_1.default
    .connect("mongodb+srv://kayigm1:kayigm132@post.kwblqh9.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
    app.use(express_1.default.json());
    app.use("/blog", routes_1.router);
    app.listen(2000, () => {
        console.log("Server has started!");
    });
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
