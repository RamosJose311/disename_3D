const {loadProducts,storeProducts,loadCategories} = require('../data/dbModules');
const {validationResult} = require('express-validator');

const db = require('../database/models')
const sequelize = db.sequelize;
const moment = require('moment');



module.exports = {
    //Renderiza CrearProducto sin datos - OK
    crearProducto : (req,res) =>{
        let categories = db.Category.findAll({
            order : ['name']
        });
        let materials = db.Material.findAll({
            order : ['name']
        });
        
        Promise.all([categories,materials])
            .then(([categories,materials]) => { 
                res.render('crearProducto',{
                    categories,
                    materials
                })})
                .catch(error => console.log(error))
    },

    //Proceso de Guardar en Base de Datos y Renderiza Home - OK
    store : (req,res) => {
        let errors = validationResult(req);
        let categories = db.Category.findAll()
        let materials = db.Material.findAll()

        if(errors.isEmpty()){
            const {name, price, discount, heigth, time, categoryId, materialId,description,imagen,view} = req.body;
            
            let array = [];
            if (req.files) {
                    array = req.files
                }
            

            //return res.send(array[0].filename)

            db.Product.create({
                ...req.body,
                name:req.body.name.trim(),
                categoryId: req.body.categoryId,
                materialId: req.body.materialId,
                view : "stock"
            })
                .then((product) => {
                    let namefiles = ""
                    if(array.length > 0){
                        namefiles = array[0].filename
                            console.log('------nombre:' + array[0].filename)
                            console.log('------nombre2'+ namefiles)
                    }else{
                        namefiles = "default_no_image.jfif"
                    }

                        db.Image.create({
                            file: namefiles,
                            productsId: product.id
                        })
                            .then(() => res.redirect('/'))
                            .catch(err => console.log(err))
                    }
                )
                .catch(error => console.log("======ERROR========>" + error))
         }else{
            Promise.all([categories,materials])
                .then(([categories,materials]) => { 
                    res.render('crearProducto',{
                        categories,
                        materials,
                        errors : errors.mapped(),
                        old : req.body
                    })})
                    .catch(error => console.log(error))
            }
        }, 

    //Renderiza EditarProducto con datos - OK
    editarProducto : (req,res) => {
        let categories = db.Category.findAll()
        let materials = db.Material.findAll()

        let product = db.Product.findByPk(req.params.id);
        
        Promise.all([categories,materials,product])
            .then(([categories,materials,product]) => {
                res.render('editarProducto', {
                    product,
                    categories,
                    materials
                })
            })
            .catch(error => console.log ("=====ERROR======>" + error))
    },

    //Proceso de Actualizar en Base de Datos y Renderiza Detail - OK
    update : (req, res) =>{
        db.Product.update(
            {
                ...req.body,
                name : req.params.name.trim()
            },
            {
                where : {id:req.params.id}
            }
        )
        .then (result => {
            console.log(result)
            return res.redirect('/products/detalle/'+ req.params.id)
        })
        .catch(error => console.log(error))

    },

    //Consulta para Borrar en Base de Datos - POR APLICAR
    delete: function (req, res) {
        db.Product.findByPk(req.params.id)
         .then(product => {
             res.render('productDelete',{
             product
         })})
         .catch(error => console.log(error))
     },

    //Proceso de Borrar en Base de Datos y Renderiza Home - OK
    destroy: function (req, res) {
        db.Product.destroy({
            where : {
                id : req.params.id
            }
        })
        .then (result => {
            console.log(result)
            return res.redirect('/')
        })
        .catch(error => console.log(error))
    }



}


