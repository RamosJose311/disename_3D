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
            
            db.Product.create({
                ...req.body,
                name:name.trim(),
                categoryId: req.body.categoryId,
                materialId: req.body.materialId,
                view : "stock"
            })
                .then(product => {
                    console.log(product)
                    return res.redirect('/')
                })
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
                console.log(product) 
                console.log(materials)
                console.log(categories)
                res.render('editarProducto', {
                    product,
                    categories,
                    materials
                })
            })
            .catch(error => console.log ("=====ERROR======>" + error))
    },


    update : (req, res) =>{
        return res.send(req.body)
        db.Product.update(
            {
                ...req.body,
                name : req.body.name.trim()
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
 
/*         update: function (req,res) {
        db.Movie.update(
            {
                ...req.body,
                title : req.body.title.trim()
            },
            {
                where : {id:req.params.id}
            }
        )
        .then (result => {
            console.log(result)
            return res.redirect('/movies/detail/' + req.params.id)
        })
        .catch(error => console.log(error))
        
    }, */



    destroy : (req,res) => {
        const products = loadProducts();
        const {id} = req.params;
        let productsModify=products.filter(product=> product.id !== +id )
        storeProducts(productsModify);
        return res.redirect('/');        
    }

}


