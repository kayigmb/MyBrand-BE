import express, {Request, Response} from 'express'
import { Message } from '../models/query'

// message show 
const messageShow = async (req:Request, res:Response) => {
    const messages = await Message.find()
    res.status(200).json(messages)
}


const messageCreate = async (req:Request, res:Response) => {
    
    try{
            const message = new Message({
                    name:req.body.name,
                    email:req.body.email,
                    content:req.body.content
            })
            await message.save();
            res.status(201).json(message)

    } catch(err){
                res.status(500).json({error: 'Internal Server Error'})
    }
}


export {messageCreate,messageShow}