const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null,'public/images/imgUsers')
    },
    filename : function (req,file,callback){
        callback(null, `${Date.now()}_avatars${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage 
})

module.exports = upload