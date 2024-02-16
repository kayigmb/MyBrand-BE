import {Schema,model,Types} from 'mongoose';
import { comment } from '../utils/types';

const commentSchema = new Schema<comment>({
    name: {
        type: 'string',
        required: false
    },
    email: {
        type: 'string',
        required: false,
    },
    comment: {
        type: 'string',
        required: false,
    },
    // createdAt: {
    //     type: Date,
    // },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog' 
    }
});

export const Comment = model<comment>('Comment', commentSchema);
