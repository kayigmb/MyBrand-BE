import { Schema, model, Types} from  "mongoose"
import {blog} from '../utils/types';
import { required } from "joi";

const blogSchema = new Schema<blog>({
    title: {
        type: String
    },
    author: {
        type: String,
    },
    image: String,
    content: {
        type: String
    },
    likes:[{ user: { type: Schema.Types.ObjectId, ref: 'User' } }],
});

export const Blog = model<blog>("Blog", blogSchema);

