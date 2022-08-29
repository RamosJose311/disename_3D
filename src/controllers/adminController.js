const {loadProducts,storeProducts} = require('../data/dbModules');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    crearProducto : (req,res) =>{
        return res.render('crearProducto')
    },
    editarProducto : (req,res) =>{
        return res.render('editarProducto')
    },
    add : (req,res) => {
        return res.render('crearProducto')
    },
    store : (req,res) => {
    const{nombre, precio, descuento, altura, tiempo, categoria, descripcion}= req.body;
		let products = loadProducts();
		const newProduct = {
			id : products[products.length -1].id +1,
			nombre : nombre.trim(),
			precio : +precio,
			descuento :  +descuento,
			altura : +altura,
			tiempo : +tiempo,
            categoria: categoria,
            descripcion : descripcion.trim(),
			imagen : 'groot1.jpg'
		}
		productsModify = [...products, newProduct];
		storeProducts(productsModify);
		return res.redirect('/')
	},
    

}