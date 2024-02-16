
import {Schema,model}from 'mongoose'

interface message {
    name:string,
    email:string,
    content:string
}

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