var express = require('express');
var router = express.Router();
const prodPersonalValidator = require('../validations/productPersonalValidator')
const editProductsValidator = require('../validations/productsValidator')
const {detalle,productCart,modelDisponible,reqPersonalizados,personalizado,addPersonalizado,imprimir,search} = require('../controllers/productController');

const productSessionCheck = require('../middlewares/productSessionCheck');
const upload = require('../middlewares/multerFileProduct')

/* /products*/
router
    .get('/reqPersonal',reqPersonalizados)
    .get('/personalizado',productSessionCheck,personalizado)
    .post('/addPersonalizado',productSessionCheck,upload.array('imagePersonal'),prodPersonalValidator,addPersonalizado)


    .get('/detalle/:id',editProductsValidator,detalle)// agrego id del producto
    
    .get('/productCart',productSessionCheck, productCart)
    .get('/disponible',modelDisponible)
    .get('/imprimir',imprimir)
    .get('/search',search)

module.exports = router;


