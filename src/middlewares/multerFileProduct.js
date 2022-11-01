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

const fileUpload = multer({
    storage
})

module.exports = fileUpload



