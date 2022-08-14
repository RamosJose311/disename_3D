var express = require('express');
var router = express.Router();

const {inicio} = require('../controllers/inicioController');
/* / */
router
  .get('/', inicio)


module.exports = router;
