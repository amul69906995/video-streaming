const express = require('express')
const router = express.Router()
const catchAsync = require('../error/catchAsync')
const appError = require('../error/appError')
const upload = require('../utils/multer.js')
const path = require('path')
const fs = require('node:fs/promises');
const uploadToCloudinary = require('../utils/uploadToCloudinary.js')
const Video = require('../models/video.js')



router.post('/upload-video', upload.single('videoFile'), catchAsync(async (req, res, next) => {
    const { title } = req.body;
    console.log(req.file)
    const filepath = path.join(__dirname, "../", req.file.path);
    //console.log(title,filepath);
    const result = await uploadToCloudinary(filepath);
    const newVideo = new Video({ title, originalUrl: result.secure_url });
    await newVideo.save();
    console.log(newVideo)
    res.send({ "message": "success" })
}))

//get all video
router.get('/all-video', catchAsync(async (req, res, next) => {
    const allVideo = await Video.find({});
    res.json(allVideo)

}))





module.exports = router;