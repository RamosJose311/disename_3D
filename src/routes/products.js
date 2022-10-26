var express = require('express');
var router = express.Router();
const prodPersonalValidator = require('../validations/productPersonalValidator')

const {detalle,productCart,modelDisponible,personalizado,addPersonalizado,imprimir,search} = require('../controllers/productController');

const productSessionCheck = require('../middlewares/productSessionCheck');

/* /products*/
router
    .get('/personalizado',productSessionCheck,personalizado)
    .post('/addPersonalizado', productSessionCheck,prodPersonalValidator,addPersonalizado)


    .get('/detalle/:id',detalle)// agrego id del producto
    
    .get('/productCart',productSessionCheck, productCart)
    .get('/disponible',modelDisponible)
    .get('/imprimir',imprimir)
    .get('/search',search)

module.exports = router;


