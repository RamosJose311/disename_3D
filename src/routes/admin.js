var express = require('express');
var router = express.Router();

const {crearProducto,editarProducto, add, store, update} = require('../controllers/adminController');


/* /admin */

router
    .get('/crearProducto',crearProducto)
    .get('/editarProducto/:id', editarProducto)
    .get('/add',add)
    .post('/add',store)
    .put('/update/:id', update)

module.exports = router;