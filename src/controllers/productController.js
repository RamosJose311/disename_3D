const { loadProducts, storeProducts } = require('../data/dbModules');
const db = require('../database/models');
const { Op } = require("sequelize");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {validationResult} = require('express-validator');
const fs = require ('fs');
const path = require ('path');

module.exports = {
    // HAY QUE TRABAJAR EN LA VISTA DE PRODUCTCART
    productCart: (req, res) => {
        db.carts.findAll()
            .then(carts => res.render('productCart', {carts}))
            .catch(error => console.log(error))
    },

    // VISTA QUE MUESTRA LOS PRODUCTOS DISPONIBLES EN MODELOS DISPONIBLES -- OK
    modelDisponible: (req, res) => {
        db.Product.findAll({
            include: [
                {
                    association : 'images',
                    attributes : ['id', 'file','productsId']
                }
            ],

             where : {
                view : "stock"
            }
         })
                    .then(products => {
                        //return res.send(products) 
                        res.render('modelDisponible',{
                            products,
                            toThousand
                     })})
                     .catch(error => console.log(error))
   },

    // VISTA QUE MUESTRA LOS PRODUCTOS DISPONIBLES EN MODELOS PARA IMPRIMIR --OK
    imprimir: (req, res) => {
        
        db.Product.findAll({
            include: [
                {
                    association : 'images',
                    attributes : ['id', 'file','productsId']
                }
            ],

            where : {
                view : "print"
            }
        })
                    .then(products => { 
                        //return res.send(products) 
                        res.render('modelPrint',{
                        products,
                        toThousand
                     })})
                     .catch(error => console.log(error))
    },


    // VISTA QUE MUESTRA LOS PRODUCTOS DISPONIBLES EN MODELOS PARA IMPRIMIR --OK
    reqPersonalizados: (req, res) => {
        
        console.log("  --------------que trae params------------->>> " + req.params)
        db.Product.findAll({
            include: [
                {
                    association : 'images',
                    attributes : ['id', 'file','productsId']
                }
            ],

            where : {
                view : "personal"
            }
        })
                    .then(products => { 
                        //return res.send(products) 
                        res.render('modelPersonal',{
                        products,
                        toThousand
                     })})
                     .catch(error => console.log(error))
    },




    // VISTA QUE MUESTRA FORMULARIO PARA AGREGAR PRODUCTOS PERSONALIZADOS REQUERIDOS --OK
    personalizado: (req, res) => {
        let categories = db.Category.findAll({
            order : ['name']
        });
        let materials = db.Material.findAll({
            order : ['name']
        });

        Promise.all([categories,materials])
            .then(([categories,materials]) => { 
                res.render('personalizado',{
                    categories,
                    materials
                })})
                .catch(error => console.log(error))
    },
    
    // VISTA QUE MUESTRA LOS PRODUCTOS PERSONALIZADOS - PARA CARGAR POR USUARIO - OK
    addPersonalizado: (req, res) => {
        let errors = validationResult(req);
        errors = errors.mapped();

        if (req.fileValidationError){
            errors ={
                ...errors,
                imagePersonal : {
                    msg:req.fileValidationError
                }
            }
        } 



      if(Object.entries(errors).length === 0){
           const {name, price, discount, heigth, time, categoryId, materialId,description,imagen,view} = req.body;

           let array = [];
           if (req.files) {
                   array = req.files
           }


           db.Product.create({
               ...req.body,
               name:name.trim(),
               price: 0,
               time: 0,
               discount: 0,
               categoryId: req.body.categoryId,
               materialId: req.body.materialId,
               view : "personal"
           })
           .then((product) => {
            let namefiles = ""
            if(array.length > 0){
                namefiles = array[0].filename
            }else{
                namefiles = "No_Image.png"
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

/*             if (req.files.length > 0){
                req.files.forEach(({filename}) => {
                    fs.existsSync(path.resolve(__dirname,"..","..","public","images","imgProducts",filename)) &&
                    fs.unlinkSync(path.resolve(__dirname,"..","..","public","images","imgProducts",filename))
                });
            } 
 */
            let categories = db.Category.findAll()
            let materials = db.Material.findAll()
            Promise.all([categories,materials])
               .then(([categories,materials]) => { 
                   res.render('personalizado',{
                       categories,
                       materials,
                       errors : errors,
                       old : req.body
                   })})
                   .catch(error => console.log(error))
           }
    },





    
    detalle: (req, res) => {

        db.Product.findByPk(req.params.id,{
                    include: [
                        {
                            association : 'images',
                            attributes : ['id', 'file','productsId']
                        },
                        {
                            association : 'materials',
                            attributes : ['name']
                            
                        },
                        {
                            association : 'categories',
                            attributes : ['name']
                            
                        }
                    ]})
            .then(product => { 
                    //return res.send(product)
                    res.render('detalle', {
                    product,
                    toThousand
                 })})
                 .catch(error => console.log(error))
    },

    
    search : (req,res) => {

        let { keywords } = req.query;

		db.Product.findAll({
			where: {
				[Op.or]: [
					{
						name: {
							[Op.substring]: keywords,
						},
					},
					{
						description: {
							[Op.substring]: keywords,
						},
					},
				],
			},
		})
			.then((result) => {
				return res.render("result", {
					result,
					toThousand,
					keywords,
				});
			})
            .catch(error => console.log(error))
    },


}

