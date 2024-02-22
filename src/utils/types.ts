import {ObjectId, Types} from "mongoose"

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
    image:string,
    content:string,
    likes:{ user: Types.ObjectId }[];
}

interface message {
    name:string,
    email:string,
    content:string
}

interface User{
    username: string,
    password:string,
    admin?:Boolean;
    blogsCreated?:Types.ObjectId[]
}

interface JwtPayload {
    user: {
      _id: any;
      username: string;
      password: string;
    };
}


export {comment,blog, message,User,JwtPayload}