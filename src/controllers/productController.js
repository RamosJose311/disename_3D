const { loadProducts, storeProducts } = require('../data/dbModules');
const db = require('../database/models');
const { Op } = require("sequelize");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const sequelize = db.sequelize;
//const db = require('../database/models')

module.exports = {
    productCart: (req, res) => {
        db.carts.findAll()
            .then(carts => res.render('productCart', {carts}))
            
            .catch(error => console.log(error))

    },


    

    modelDisponible: (req, res) => {
        db.Product.findAll()
                    .then(products => res.render('modelDisponible',{
                        products,
                        toThousand
                     }))
                     .catch(error => console.log(error))

   },

    personalizado: (req, res) => {
        
        db.Product.update(
            {
                ...req.body,
                view : req.body.view //tendria q devolver el campo view como personal pero no me sale 
            },
            {
                where : {id:req.params.id}
            }
        )
        .then (
             (products => res.render('personalizado', {
                products
            }))
        )
        .catch(error => console.log(error))

    },
    
    imprimir: (req, res) => {
        
        db.Product.findAll()
                    .then(products => res.render('modelPrint',{
                        products,
                        toThousand
                     }))
                     .catch(error => console.log(error))

        
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

