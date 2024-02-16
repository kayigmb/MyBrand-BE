"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routers/routes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;
mongoose_1.default
    .connect(databaseUrl)
    .then(() => {
    console.log("Connected to MongoDB.");
    app.use(express_1.default.json());
    app.use("/blog", routes_1.router);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch(error => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});
// mongodb+srv://kayigm1:kayigm132@post.kwblqh9.mongodb.net/?retryWrites=true&w=majority
