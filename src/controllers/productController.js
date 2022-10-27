const { loadProducts, storeProducts } = require('../data/dbModules');
const db = require('../database/models');
const { Op } = require("sequelize");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const sequelize = db.sequelize;
const {validationResult} = require('express-validator');
//const db = require('../database/models')

module.exports = {
    // HAY QUE TRABAJAR EN LA VISTA DE PRODUCTCART
    productCart: (req, res) => {
        db.carts.findAll()
            .then(carts => res.render('productCart', {carts}))
            .catch(error => console.log(error))
    },

    // VISTA QUE MUESTRA LOS PRODUCTOS DISPONIBLES EN MODELOS DISPONIBLES
    modelDisponible: (req, res) => {
        db.Product.findAll()
                    .then(products => res.render('modelDisponible',{
                        products,
                        toThousand
                     }))
                     .catch(error => console.log(error))
   },

    // VISTA QUE MUESTRA LOS PRODUCTOS DISPONIBLES EN MODELOS PARA IMPRIMIR
    imprimir: (req, res) => {
        
        db.Product.findAll()
                    .then(products => res.render('modelPrint',{
                        products,
                        toThousand
                     }))
                     .catch(error => console.log(error))
    },


    // VISTA QUE MUESTRA LOS PRODUCTOS PERSONALIZADOS REQUERIDOS
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
    
    // VISTA QUE MUESTRA LOS PRODUCTOS PERSONALIZADOS REQUERIDOS
    addPersonalizado: (req, res) => {
      // return res.send(req.body)

       let errors = validationResult(req);
       let categories = db.Category.findAll()
       let materials = db.Material.findAll()

       if(errors.isEmpty()){
           const {name, price, discount, heigth, time, categoryId, materialId,description,imagen,view} = req.body;
           
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
               .then(product => {
                   console.log(product)
                   return res.redirect('/')
               })
               .catch(error => console.log("======ERROR========>" + error))
       }else{
           Promise.all([categories,materials])
               .then(([categories,materials]) => { 
                   res.render('personalizado',{
                       categories,
                       materials,
                       errors : errors.mapped(),
                       old : req.body
                   })})
                   .catch(error => console.log(error))
           }


    },


    detalle: (req, res) => {

        db.Product.findByPk(req.params.id)
            .then(product =>  res.render('detalle', {
                    product,
                    toThousand
                 }))
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

