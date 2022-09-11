var express = require('express');
var router = express.Router();

const {login,register,processRegister} = require('../controllers/userController');

/* /user */
router
  .get('/login',login)
  .get('/register',register)
  .post('/process',processRegister)

module.exports = router;
