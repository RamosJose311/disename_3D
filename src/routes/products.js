var express = require('express');
var router = express.Router();


const {detalle,productCart,modelDisponible,personalizado,imprimir,search} = require('../controllers/productController');

/* /products*/
router
    .get('/detalle/:id', detalle)// agrego id del producto
    .get('/productCart', productCart)
    .get('/disponible',modelDisponible)
    .get('/personalizado',personalizado)
    .get('/imprimir',imprimir)
    .get('/search',search)

module.exports = router;


