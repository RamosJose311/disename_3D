var express = require('express');
var router = express.Router();


const {detalle,productCart,archivo,personalizado,proyecto,search} = require('../controllers/productController');

/* /products*/
router
    .get('/detalle/:id', detalle)// agrego id del producto
    .get('/productCart', productCart)
    .get('/archivo',archivo)
    .get('/personalizado',personalizado)
    .get('/proyecto',proyecto)
    .get('/search',search)

module.exports = router;


