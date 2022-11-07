var express = require('express');
var router = express.Router();

const {crearProducto,editarProducto, add, store, update, destroy} = require('../controllers/adminController');
const productValidator = require('../validations/productsValidator')
const adminSessionCheck = require ('../middlewares/adminSessionCheck')


const upload = require('../middlewares/multerFileProduct')



/* /admin */

router
    .get('/crearProducto',adminSessionCheck,crearProducto)
    .post('/add',upload.array('imageProduct'),productValidator,store)

    .get('/editarProducto/:id',adminSessionCheck, editarProducto)
    .put('/update/:id',upload.array('imageProduct'),productValidator, update)

    

    
    .delete('/delete/:id', destroy)

module.exports = router;