var express = require('express');
var router = express.Router();

const {detalle,productCart} = require('../controllers/productController');

/* /products*/
router
    .get('/detalle', detalle)
    .get('/productCart', productCart)

module.exports = router;