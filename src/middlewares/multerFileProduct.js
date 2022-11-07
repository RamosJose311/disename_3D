const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null, path.join(__dirname,'../../public/images/imgProducts'));
    },
    filename : function (req,file,callback){
        callback(null, `${Date.now()}_product_${path.extname(file.originalname)}`)
    }
});

const fileFilter = (req, file, callback) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
       req.fileValidationError = "Solo se permite la carga de archivos de imagen"
       return callback(null, false, req.fileValidationError) 
    }

    return callback(null,true)
}


const fileUpload = multer({
    storage,
    fileFilter
})

module.exports = fileUpload



