const { loadProducts, storeProducts } = require('../data/dbModules');
const db = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const sequelize = db.sequelize;
//const db = require('../database/models')

module.exports = {
    productCart: (req, res) => {
        db.carts.findAll()
                .then(carts => res.render('productCart', {carts}) )
         
    },


    

    modelDisponible: (req, res) => {
        /* const products = loadProducts(); // se saca?? */
        db.Product.findAll()
                    .then(products => res.render('modelDisponible',{
                        products,
                        toThousand
                     }))

         /* return res.render('modelDisponible',{
            products,
            toThousand
         }) */
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

        /* return res.render('personalizado', {
            products,
            toThousand
        }) */

    },
    
    imprimir: (req, res) => {
        
        db.Product.findAll()
                    .then(products => res.render('modelPrint',{
                        products,
                        toThousand
                     }))

         /* return res.render('modelPrint',{
            products,
            toThousand
         }) */
        
    },
    
    detalle: (req, res) => {
        //const products = loadProducts();
        //const product = products.find(product => product.id === +req.params.id);
        db.Product.findByPk(req.params.id)
            .then(product => {
                     res.render('detalle', {
                    product,
                    toThousand
                 })})
 
        /* return res.render('detalle', {
            product,
            toThousand
        }) */
    },


    search : (req,res) => {

        const products = loadProducts();
        const result = products.filter(product => product.categoria.toLowerCase().includes(req.query.keywords.toLowerCase()))
        return res.render('result', {
            products : result,
            keywords : req.query.keywords
        })
    },


}

