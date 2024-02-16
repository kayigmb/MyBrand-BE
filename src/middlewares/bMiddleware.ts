import { validateBlog } from "../utils/validation";
import { Request,Response } from "express";


const vBlog = async(req:Request, res:Response) => {
    try{
        const { error } = validateBlog(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        } 
    } catch(error){
        console.log(error);
        res.status(500).send({ error:"internal error"})
    }

}

export {vBlog}