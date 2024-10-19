import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLUOD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (loacalFilePath)=>{
    try {
        if (!loacalFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(loacalFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded successfully
        console.log("File is uploaded successfully on cloudinary",response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(loacalFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null; 
    }
}

export { uploadOnCloudinary }