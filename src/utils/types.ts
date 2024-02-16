import {Types} from "mongoose"

interface comment {
    name:string,
    email:string,
    comment:string,
    // createdAt?:Date;
    blog: Types.ObjectId;
}

interface blog{
    title:string,
    author:string,
    image?:string,
    content:string,
    comments?: Types.ObjectId[];
}

interface message {
    name:string,
    email:string,
    content:string
}


export {comment,blog, message}