var express = require('express');
var router = express.Router();

const {crearProducto,editarProducto,update} = require('../controllers/adminController');


/* /admin */

router
    .get('/crearProducto',crearProducto)
    .get('/editarProducto/:id', editarProducto)
    .put('/update/:id', update)

module.exports = router;