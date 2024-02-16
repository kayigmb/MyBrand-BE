import { Schema, model,Types} from  "mongoose"

// import {commentPost} from "../controllerComment"

interface blog{
    title:string,
    author:string,
    image?:string,
    content:string,
    comments?: Types.ObjectId[];
}

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
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

export const Blog = model<blog>("Blog", blogSchema);

