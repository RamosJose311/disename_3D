var express = require('express');
var router = express.Router();


const {detalle,productCart,modelDisponible,personalizado,imprimir,search} = require('../controllers/productController');

const productSessionCheck = require('../../middlewares/productSessionCheck');

/* /products*/
router
    .get('/detalle/:id',productSessionCheck,detalle)// agrego id del producto
    .get('/productCart',productSessionCheck, productCart)
    .get('/disponible',modelDisponible)
    .get('/personalizado',productSessionCheck,personalizado)
    .get('/imprimir',imprimir)
    .get('/search',search)

module.exports = router;


