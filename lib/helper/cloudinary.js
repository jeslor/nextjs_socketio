import { v2 as cloudinary } from 'cloudinary';

export const uploadCloudinary =  async (image,section)=> {

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET 
   
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           image, {
               public_id: section,
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url(section, {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    return uploadResult
};