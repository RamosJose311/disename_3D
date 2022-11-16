const { all, getOne, getImageProduct } = require('../../controllers/api/apiProductsController');

const router = require('express').Router();

/* /api/products */

router
    .get('/',all)
    .get('/:id',getOne)
    .get('/imagen/:img',getImageProduct)


module.exports = router