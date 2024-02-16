"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
// import {commentPost} from "../controllerComment"
// interface blog{
//     title:string,
//     author:string,
//     image:string,
//     content:string,
// }
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    image: String,
    content: {
        type: String,
        required: true,
    }
});
exports.Blog = (0, mongoose_1.model)("Blog", blogSchema);
