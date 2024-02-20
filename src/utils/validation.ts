import joi from "joi"
import {comment,blog, message,User} from "./types"

// validate comments

const validateComments = (comment:comment)=>{
        const commentSchema = joi.object({
            name: joi.string().required(),
            email:joi.string().email().required(),
            image: joi.string().required(),
            comment: joi.string().required()
        })

        return commentSchema.validate(comment);
}
// validate messages
const  validateMessages = (message:message)=>{
            const messageSchema = joi.object({
                name: joi.string().required(),
                email:joi.string().email().required(),
                content: joi.string().required()
            })
            return messageSchema.validate(message)
}

//  validate Blog
const validateBlog= (blog:blog)=>{
    const blogSchema = joi.object({     
        title: joi.string().required(),
        // author: joi.string().required(),
        image: joi.string().required(),
        content: joi.string().required()
    })
    return blogSchema.validate(blog)
}

const validateUser = (user:User) =>{
    const userSchema = joi.object({
        user:joi.string().required().min(3).max(20),
        password:joi.string().min(6).max(30).required()
    })
    return userSchema.validate(user)
}

export {validateComments,validateMessages,validateBlog,validateUser}