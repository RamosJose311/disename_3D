var express = require('express');
var router = express.Router();

const {login,register,processRegister,processLogin,profile,logout,update} = require('../controllers/userController');
const loginValidator = require ('../validations/loginValidator')
const registerValidator =require('../validations/registerValidation')
const userSessionCheck = require('../middlewares/userSessionCheck');
const uploadFile = require('../middlewares/uploadFile')



/* /user */
router
.get('/login',login)
.post('/login',loginValidator,processLogin)

.get('/register',register)
.post('/process',registerValidator,processRegister)

.get('/profile',userSessionCheck,profile)
.put('/update/:id',update)/* ,uploadFile.single('avatar') */

.get('/logout/:id',logout)

module.exports = router;
