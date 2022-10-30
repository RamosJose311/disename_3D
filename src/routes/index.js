var express = require('express');
var router = express.Router();
let cookieCheck = require('../middlewares/cookieCheck');

const {inicio} = require('../controllers/inicioController');
/* / */
router
  .get('/' ,cookieCheck,inicio)   

module.exports = router;
