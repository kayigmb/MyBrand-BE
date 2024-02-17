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
    likes:[{ user: { type: Schema.Types.ObjectId, ref: 'User' } }],
});

export const Blog = model<blog>("Blog", blogSchema);

