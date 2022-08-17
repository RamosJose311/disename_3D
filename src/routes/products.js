var express = require('express');
var router = express.Router();

const {detalle,productCart,crearProducto,editarProducto} = require('../controllers/productController');

/* /products*/
router
    .get('/detalle', detalle)
    .get('/productCart', productCart)

module.exports = router;