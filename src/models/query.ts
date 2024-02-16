import {Schema,model}from 'mongoose'
import {message} from '../utils/types';

const messageSent = new Schema<message>({
        name:{
            type: 'string',  
        },
        email:{
            type: 'string',
        },
        content:{
            type: 'string',
        }
})

export const Message = model<message>('message', messageSent)