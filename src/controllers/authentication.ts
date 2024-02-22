import express, {Request,Response} from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto"
import flash from "express-flash";
import { UserModel } from "../models/authModel";
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT} from 'passport-jwt';
import bcrypt from 'bcrypt'
import '../utils/passport'
import { issueJwt } from "../utils/jwt";
import Jwt from 'jsonwebtoken';

const fields = {
    usernameField: 'username',
    passwordField: 'password'
};

const signup = async (username: string, password: any, done: Function) => {
    try {
     
        const existUser = await UserModel.findOne({ username: username });

            if (existUser) {
                return done(null, false, { message: 'User already exists' });
            }


                const hashPassword = await bcrypt.hash(password, 10);


                    const newUser = new UserModel({
                        username: username,
                        password: hashPassword 
                    });

        
            await newUser.save();

        return done(null, newUser, 'Success SignUp');
    } catch (err) {

        return done(err);
    }
};

passport.use(

    'signup', 
        new LocalStrategy(fields, signup)

);


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


const loginUser = async (username:string, password:string,done:Function)=>{
        try{    
            const findUser = await UserModel.findOne({username: username})

            if(!findUser) {
                    
              return done(null,false,{message:"User not found"})
              
            }

            const isValid = await bcrypt.compare(password, findUser.password)
       
            if (!isValid) {
                return done(null,false,{message:"Incorrect password"})
                
            }
    
            else{
                return done(null,findUser,{message: "Successful login"})
            }
        }
        catch(err){
            console.error(err);
            done(err);
        }

}

passport.use(
    'login',
        new LocalStrategy (fields, loginUser)
)

export {registerAdmin}