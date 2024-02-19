import {v2 as cloudinary} from 'cloudinary'

import dotenv from 'dotenv'
// import multer from 'multer'

dotenv.config();    

const cloud_name = process.env.CLOUD_NAME
const api_key = process.env.API_KEY
const api_secret = process.env.API_SECRET

cloudinary.config({
    cloud_name,
    api_key,
    api_secret
})

export {cloudinary}