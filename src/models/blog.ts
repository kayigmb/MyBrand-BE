import { Schema, model } from  "mongoose"

// import {commentPost} from "../controllerComment"

// interface blog{
//     title:string,
//     author:string,
//     image:string,
//     content:string,
// }

const blogSchema = new Schema({
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

export const Blog = model("Blog", blogSchema);

