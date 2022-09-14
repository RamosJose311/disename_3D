var express = require('express');
var router = express.Router();

const {crearProducto,editarProducto, add, store, update, destroy} = require('../controllers/adminController');
const productValidator = require('../validations/productsValidator')


/* /admin */

router
    .get('/crearProducto',crearProducto)
    .get('/editarProducto/:id', editarProducto)
    .get('/add',add)
    .post('/add', productValidator,store)
    .put('/update/:id', update)
    .delete('/delete/:id', destroy)

module.exports = router;