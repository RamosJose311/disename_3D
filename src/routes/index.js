var express = require('express');
var router = express.Router();

const {inicio,productCart} = require('../controllers/inicioController');
/* / */
router
  .get('/', inicio)
  .get('/productCart', productCart)

module.exports = router;
