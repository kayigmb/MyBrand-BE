import {Schema,model,Mongoose} from 'mongoose';
import {Validator} from "validator.ts/Validator";


const commentSchema = new Schema({
    name: {
        type: 'string',
        required: false
    },
    email: {
        type: 'string',
        required: false,
        // validate(value:string){
        //     if(!Validator.isEmail(value)){

        //     }   
        // }
    },
    comment: {
        type: 'string',
        required: false,
    },
    createdAt: Date,
});

export const Comment = model('Comment', commentSchema);
