const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    thumbnail:{
         type:String,
         default:""
    },
    originalUrl:{
        type:String,
        required:true,
        unique:true
    },
    resolutions: {
        '240p': { type: String, default: "" },
        '360p': { type: String, default: "" },
        '480p': { type: String, default: "" },
        '720p': { type: String, default: "" },
        '1080p': { type: String, default: "" },
    }
})
//
const Video=mongoose.model('Video',videoSchema);
module.exports=Video;