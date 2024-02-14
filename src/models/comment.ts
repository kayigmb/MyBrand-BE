import {Schema,model} from 'mongoose';
import {body} from 'express-validator';


const commentSchema = new Schema({
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
    createdAt: Date,
});

export const Comment = model('Comment', commentSchema);
