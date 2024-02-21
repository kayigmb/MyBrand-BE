import express, {Request,Response} from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto"
import flash from "express-flash";
import { UserModel } from "../models/authModel";
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT} from 'passport-jwt';
import bcrypt from 'bcrypt'
import '../utils/passport'


const registerUser = async(req:Request,res:Response)=>{
        try{

            const {username, password} = req.body           
            
            const userExist =  await UserModel.findOne({username: username});

            if(userExist) return res.status(409).json('user already exists')

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({
                username: username,
                password: hashPassword
            })

            await newUser.save();

            res.status(201).send(newUser)
        }
        catch(err){
            console.error(err);
            res.status(500).send("Error internal server")

        }
}


const registerAdmin = async(req:Request,res:Response)=>{
    try{

        const {username, password} = req.body

        const userExist =  await UserModel.findOne({username: username});

        if(userExist) return res.status(409).json('user already exists')

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username: username,
            password: hashPassword,
            admin: true
        })

        await newUser.save();
        res.status(201).send(newUser)
    }   
    catch(err){
        console.error(err);
        res.status(500).send("Error internal server")

    }
}


const login = {
    
}




export {registerUser,registerAdmin,login}