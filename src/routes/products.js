var express = require('express');
var router = express.Router();

const {detalle} = require('../controllers/productController');

/* /producst */
router
    .get('/detalle', detalle)

module.exports = router;