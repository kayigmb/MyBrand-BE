import express, {Response,Request} from 'express'
import { validateComments } from '../utils/validation'


const vComments = async (req:Request, res:Response, next:Function) => {
    try {
        const { error } = validateComments(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        next(); 
    } catch (error) {
        console.error("Error validating comment:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}

export {vComments}