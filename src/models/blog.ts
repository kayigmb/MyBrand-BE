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
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    like:{ type: Schema.Types.ObjectId, ref: 'like' },
});

export const Blog = model<blog>("Blog", blogSchema);

