var express = require('express');
var router = express.Router();

const {login,register,processRegister,processLogin,profile,logout,update} = require('../controllers/userController');
const loginValidator = require ('../validations/loginValidator')
const registerValidator =require('../validations/registerValidation')
const userSessionCheck = require('../../middlewares/userSessionCheck');



/* /user */
router
.get('/login',login)
.post('/login',loginValidator,processLogin)

.get('/register',register)
.post('/process',registerValidator,processRegister)

.get('/profile',userSessionCheck,profile)
.put('/update/:id',update)

.get('/logout',logout)

module.exports = router;
