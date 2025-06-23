import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

const uploadImageCloudinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())
    console.log("CLOUDINARY CONFIG:");
    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({folder: "blinkit"}, (error, uploadResult) => {
            if(error){
                console.error("Cloudinary upload error: ", error);
                return reject(error)
            }
            return resolve(uploadResult)
        }).end(buffer)
    })

    return uploadImage
}

export default uploadImageCloudinary;