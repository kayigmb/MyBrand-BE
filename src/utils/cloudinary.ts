import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'


dotenv.config();    


cloudinary.config({
    cloud_name: "dqxifvhik",
    api_key:"829499898424243",
    api_secret:"2AxdrigPIpnr3JT4iVw7HPkSEp4",
})


export {cloudinary}
