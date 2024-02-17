import { Schema, model, Types} from  "mongoose"
import {blog} from '../utils/types';

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
    like:{ type:Number, ref: 'like', default:0 },
});

export const Blog = model<blog>("Blog", blogSchema);

