var express = require('express');
var router = express.Router();

const {detalle,productCart,archivo,personalizado,proyecto,} = require('../controllers/productController');

/* /products*/
router
    .get('/detalle', detalle)
    .get('/productCart', productCart)
    .get('/archivo',archivo)
    .get('/personalizado',personalizado)
    .get('/proyecto',proyecto)
module.exports = router;