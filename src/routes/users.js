var express = require('express');
var router = express.Router();



const {login,register,processRegister,processLogin,profile,userLogout,update,userDestroy} = require('../controllers/userController');
const loginValidator = require ('../validations/loginValidator')
const registerValidator =require('../validations/registerValidation')
const userSessionCheck = require('../middlewares/userSessionCheck');
const uploadFile = require('../middlewares/uploadFile')
const cookieCheck = require('../middlewares/cookieCheck');
const profileValidator = require('../validations/profileValidator')



/* /users */
router
.get('/login',login)
.post('/login',loginValidator,cookieCheck,processLogin) //cookieCheck

.get('/register',register)
.post('/process',registerValidator,processRegister)

.get('/profile',cookieCheck,userSessionCheck,profile)
.put('/update',uploadFile.single('avatar') ,profileValidator ,update)/* ,uploadFile.single('avatar') */

.get('/logout/:id',userLogout)
.delete('/destroy',userDestroy)

module.exports = router;

