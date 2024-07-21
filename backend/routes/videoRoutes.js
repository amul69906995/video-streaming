const express=require('express')
const router=express.Router()
const catchAsync=require('../error/catchAsync')
const appError=require('../error/appError')
const upload=require('../utils/multer.js')
const path=require('path')
const fs = require('node:fs/promises');




router.post('/', upload.single('videoFile'),catchAsync(async(req,res,next)=>{
console.log(path.join(__dirname,'../',req.file.path))
console.log(req.file)

}))








module.exports=router;