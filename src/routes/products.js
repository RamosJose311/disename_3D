var express = require('express');
var router = express.Router();
const productPersonalValidator = require('../validations/productsValidator')

const {detalle,productCart,modelDisponible,personalizado,addPersonalizado,imprimir,search} = require('../controllers/productController');

const productSessionCheck = require('../middlewares/productSessionCheck');

/* /products*/
router
    .get('/personalizado',productSessionCheck,personalizado)
    .post('/addPersonalizado',productPersonalValidator, productSessionCheck,addPersonalizado)


    .get('/detalle/:id',detalle)// agrego id del producto
    
    .get('/productCart',productSessionCheck, productCart)
    .get('/disponible',modelDisponible)
    .get('/imprimir',imprimir)
    .get('/search',search)

module.exports = router;


