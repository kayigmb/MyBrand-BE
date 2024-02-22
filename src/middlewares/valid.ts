import express, {Response,Request} from 'express'
import { validateMessages } from "../utils/validation";
import { validateBlog,validateUser,validateLogin } from "../utils/validation";
import { validateComments } from '../utils/validation'


const validBlog = async(req:Request, res:Response,next:Function) => {
    try{
        const {error} = validateBlog(req.body);
        if (error) {
            return res.status(404).send({ error: error.details[0].message });
        } 
        next();
    } catch(error){
        console.log(error);
        res.status(500).send({ error:"internal error"})
    }

}

const validUser = async(req:Request, res:Response,next:Function) => {
    try{
        const {error} = validateLogin(req.body);
        if (error) {
            return res.status(404).send({ error: `${error.details[0].message}` });
        } 
        next();
    } catch(error){
        console.log(error);
        res.status(500).send({ error:"internal error"})
    }

}



const validComments = async (req:Request, res:Response, next:Function) => {
    try {
        const { error } = validateComments(req.body);
        if (error) {
            return res.status(404).send({ error: error.details[0].message });
        }
        next(); 
    } catch (error) {
        console.error("Error validating comment:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}


const validMessage = async (req:Request,res:Response,next:Function)=>{
        try{
            const { error } = validateMessages(req.body);

            if(error) {
                console.log(error)
                return res.status(404).send({error:error.details[0].message});
            }
             next(); 
        } catch (error) {
            console.error("Error validating comment:", error);
            res.status(500).send({ error: "Internal server error" });
        }

}

export {validBlog,validUser,validMessage,validComments}