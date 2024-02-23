import joi from "joi"
import {comment,blog, message,User} from "./types"



// validate comments

const validateComments = (comment:comment)=>{
        const commentSchema = joi.object({
            name: joi.string().required().messages({
                'any.required': 'Name is missing'
            }),
            email:joi.string().email().required().messages({
                'any.required': 'Email is missing'
            }),
            comment: joi.string().required().messages({
                'any.required': 'Comment is missing'
            })
        })

        return commentSchema.validate(comment);
}



// validate messages
const  validateMessages = (message:message)=>{
            const messageSchema = joi.object({
                name: joi.string().required().messages({
                    'any.required': 'Name is missing'
                }),
                email:joi.string().email().required().messages({
                    'any.required': 'Email is missing'
                }),
                content: joi.string().required().messages({
                    'any.required': 'Message is missing'
                })
            })
            return messageSchema.validate(message)
}



//  validate Blog
const validateBlog= (blog:blog)=>{
    const blogSchema = joi.object({     
        title: joi.string().required().messages({
            'any.required': 'title is missing'
        }),
        image: joi.string().required().messages({
            'any.required': 'Image is missing'
        }),
        content: joi.string().required().messages({
            'any.required': 'Content is missing'
        })
    })
    return blogSchema.validate(blog)
}


//validate user
const validateUser = (user:User) =>{
    const userSchema = joi.object({

        username:joi.string().required().min(3).max(20).messages({
            'any.required': 'Username is missing'
        }),
        password:joi.string().min(6).max(30).required().messages({
            'any.required': 'Password is missing'
        })
        
    })
    return userSchema.validate(user)
}

const validateLogin = (user:User) =>{
    const userSchema = joi.object({
        username:joi.string().required().min(3).max(20).messages({
            'any.required': 'Username is missing'
        }),
        password:joi.string().min(6).max(30).required().messages({
            'any.required': 'Password is missing'
        })
    })
    return userSchema.validate(user)
}


export {validateComments,validateMessages,validateBlog,validateUser,validateLogin}