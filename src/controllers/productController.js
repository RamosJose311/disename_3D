const { loadProducts, storeProducts } = require('../data/dbModules');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    productCart: (req, res) => {
        return res.render('productCart')
    },
    archivo: (req, res) => {
        const products = loadProducts();

         return res.render('archivo',{
            products,
            toThousand
         })
    },
    personalizado: (req, res) => {
        const products = loadProducts();


        return res.render('personalizado', {
            products,
            toThousand
        })

    },
    proyecto: (req, res) => {
        const products =loadProducts();

         return res.render('proyecto',{
            products,
            toThousand
         })
        
    },
    detalle: (req, res) => {
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);
        return res.render('detalle', {
            product,
            toThousand
        })
    },
    search : (req,res) => {

        const products = loadProducts();
        const result = products.filter(product => product.nombre.toLowerCase().includes(req.query.keywords.toLowerCase()))
        return res.render('result', {
            products : result,
            keywords : req.query.keywords
        })
    },


}

