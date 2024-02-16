import {Schema,model,Types} from 'mongoose';
import {body} from 'express-validator';

interface comment {
    name:string,
    email:string,
    comment:string,
    // createdAt?:Date;
    blog: Types.ObjectId;
}
const commentSchema = new Schema<comment>({
    name: {
        type: 'string',
        required: false
    },
    email: {
        type: 'string',
        required: false,
        validate(value:string){
            if(!body(value).isEmail()){
                throw new Error('wrong format email')
            }   
        }
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
