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



    editarProducto : (req,res) =>{
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);

        return res.render('editarProducto', {product})
    },


    update : (req, res) =>{
        const products = loadProducts();
         /* return res.send(req.body) */
        const {id} = req.params;
        const {nombre,precio,descuento, categoria, descripcion, tiempo, altura, imagen} = req.body;
        const productsEdit= products.map(product => {
            if(product.id === +id){
               return {
                ...product,
                nombre : nombre.trim(),
                precio: +precio,
                descuento: +descuento,
                altura: +altura,
                tiempo: +tiempo ,
                imagen : imagen
                   }
            }
            else{  return product }
        } )
        storeProducts(productsEdit);
        return res.redirect('/products/detalle/'+id)
    },
    
    destroy : (req,res) => {
        const products = loadProducts();
        const {id} = req.params;
        let productsModify=products.filter(product=> product.id !== +id )
        storeProducts(productsModify);
        return res.redirect('/');        
    }

}


