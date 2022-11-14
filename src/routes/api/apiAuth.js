var express = require('express');
const router = express.Router();
const registerValidator =require('../../validations/registerValidation')



const { processRegister, processLogin } = require('../../controllers/api/apiAuthController');
const {checkToken} = require ('../../middlewares/checkToken');
/* api/auth */

router
    .get('/login',checkToken,processLogin)
    .post('/register',registerValidator,processRegister)

module.exports = router;