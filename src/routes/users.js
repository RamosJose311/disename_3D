var express = require('express');
var router = express.Router();

const {login,register,processRegister,processLogin, logout} = require('../controllers/userController');
const loginValidator = require ('../validations/loginValidator')
const registerValidator =require('../validations/registerValidator')

/* /user */
router
.get('/login',login)
.post('/login',loginValidator,processLogin)
.get('/register',register)
.post('/process',registerValidator,processRegister)
.get('/admin',login)
module.exports = router;
