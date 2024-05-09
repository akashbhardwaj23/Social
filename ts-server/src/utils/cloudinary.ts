import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
import dotenv from "dotenv"


dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (localfilePath:any) => { 
    try{
        if(!localfilePath) return null
        console.log(localfilePath)
        const response = await cloudinary.uploader.upload(localfilePath, {
            resource_type : "auto"
        })

        console.log("response is ",response)
        // file uploaded to clodinary 
        console.log(response.url);
        return response;
    }catch(error:any){
        fs.unlinkSync(localfilePath); // remove the locally saved temporary fiile as the upload operation got failed
        return null;
    }
}