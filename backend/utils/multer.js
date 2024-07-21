const path = require('path')
const multer=require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/mkv', 'video/webm', 'video/ogg'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only video files are allowed!'), false);
    }
    cb(null, true);
  };

const upload = multer({
    storage,
    limits: { fileSize: 50* 1024 * 1024 },
    fileFilter
})
module.exports=upload;