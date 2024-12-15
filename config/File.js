const multer = require('multer');

exports.profileImgDisk = {fileStorage:  multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'images/ProfileImgs')
    },
    filename: (req,file,cb)=>{
        cb(null, Math.random() * new Date().getMilliseconds()  + '- ' +file.originalname);
    },
    }) ,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' )
            cb(null,true);
        else
            cb(null,false);
    }
};