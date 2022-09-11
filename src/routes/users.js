var express = require('express');
var router = express.Router();

const {login,register,processLogin} = require('../controllers/userController');

/* /user */
router
  .get('/register',register)
// crear ruta de post register

  .get('/login',login)
  .post('/login',processLogin)

// Crear ruta get de profile
// crear ruta put update (actualiza profile)

module.exports = router;
