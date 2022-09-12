var express = require('express');
var router = express.Router();

const {login,register,processRegister,processLogin} = require('../controllers/userController');
const loginValidator = require ('.../')


/* /user */
router
.get('/login',login)
.post('/login',loginValidator,processLogin)
.get('/register',register)
.post('/process',processRegister)

module.exports = router;
