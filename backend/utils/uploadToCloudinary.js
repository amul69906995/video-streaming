//upload video to cloudinary
const appError = require('../error/appError')
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
//upload is slow 
// const uploadToCloudinary = async (filePath) => {
//     cloudinary.uploader.upload(filePath, {
//         resource_type: "video",
//         folder: "media"
//     }).then(result=>{
//         console.log("video upload success",result);
//     }).catch(err=>{
//         throw new appError(err.message,500);
//     })
// };
//upload in chunk fast
const uploadToCloudinary = (filePath) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(filePath, {
            resource_type: "video",
            chunk_size: 6000000,
            folder: "media"
        }, (err, result) => {
            if (err) {
                reject(new appError(err.message, err.http_code));
            } else {
                resolve(result);
              unlinkFile(filePath)
            }
        });
    });
};

//unlink file after uploading
const fs = require('fs').promises;

const unlinkFile = async (filePath) => {
    try {
        await fs.unlink(filePath);
        console.log(`File ${filePath} successfully deleted.`);
    } catch (err) {
        throw new Error(`Unable to unlink file: ${err.message}`);
    }
};

module.exports = uploadToCloudinary;