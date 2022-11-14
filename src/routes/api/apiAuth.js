var express = require('express');
const router = express.Router();
const registerValidator =require('../../validations/registerValidation')
const loginValidator =require('../../validations/loginValidator')


const { processRegister, processLogin } = require('../../controllers/api/apiAuthController');
const {checkToken} = require ('../../middlewares/checkToken');
/* api/auth */

router
    .post('/login',loginValidator,processLogin)
    .post('/register',registerValidator,processRegister)

module.exports = router;