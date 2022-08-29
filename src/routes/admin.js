var express = require('express');
var router = express.Router();

const {crearProducto,editarProducto, add, store } = require('../controllers/adminController');


/* /admin */

router
    .get('/crearProducto',crearProducto)
    .get('/editarProducto', editarProducto)
    .get('/add',add)
    .post('/add',store)

module.exports = router;