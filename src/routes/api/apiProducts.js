const { all, getOne, getImageProduct,getImage } = require('../../controllers/api/apiProductsController');

const router = require('express').Router();

/* /api/products */

router
    .get('/',all)
    .get('/:id',getOne)
    .get('/imagen/:img',getImageProduct)

    .get('/imagenes/:id',getImage)


module.exports = router