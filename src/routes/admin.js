var express = require('express');
var router = express.Router();

const {crearProducto,editarProducto, add, store, update, destroy} = require('../controllers/adminController');
const productValidator = require('../validations/productsValidator')
const adminSessionCheck = require ('../middlewares/adminSessionCheck')

/* /admin */

router
    .get('/crearProducto',adminSessionCheck,crearProducto)

    .get('/editarProducto/:id',adminSessionCheck, editarProducto)
<<<<<<< HEAD

    .get('/add',adminSessionCheck,add)
    .post('/add', productValidator,store)
    
=======
    
    //.get('/add',adminSessionCheck,add)

    .post('/add', productValidator,store)
    //.post('/add',store)
>>>>>>> 56d8b81a8bf6317fb22e8b305489a18e0d3c7737
    .put('/update/:id', productValidator, update)
    .delete('/delete/:id', destroy)

module.exports = router;