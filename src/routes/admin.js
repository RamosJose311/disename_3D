var express = require('express');
var router = express.Router();

const {crearProducto,editarProducto} = require('../controllers/adminController');


/* /admin */

router
    .get('/crearProducto',crearProducto)
    .get('/editarProducto', editarProducto)

module.exports = router;