import joi from "joi"
import {comment,blog, message} from "./types"

// validate comments

const validateComments = (comment:comment)=>{
        const commentSchema = joi.object({
            name: joi.string().required(),
            email:joi.string().email().required(),
            comment: joi.string().required()
        })

        return commentSchema.validate(comment);
}

const  validateMessages = (message:message)=>{
            const messageSchema = joi.object({
                name: joi.string().required(),
                email:joi.string().email().required(),
                content: joi.string().required()
            })
            return messageSchema.validate(message)
}



export {validateComments,validateMessages}