const {loadProducts,storeProducts} = require('../data/dbModules');


module.exports = {
    crearProducto : (req,res) =>{
        return res.render('crearProducto')
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
    editarProducto : (req,res) =>{
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);

        return res.render('editarProducto', {product})
    },
    update : (req, res) =>{
        const products = loadProducts();
         /* return res.send(req.body) */
        const {id} = req.params;
        const {nombre,precio,descuento, categoria, descripcion, tiempo, altura} = req.body;
        const productsEdit= products.map(product => {
            if(product.id === +id){
               return {
                ...product,
                nombre : nombre.trim(),
                precio: +precio,
                descuento: +descuento,
                altura: +altura,
                tiempo: +tiempo        }
            }
            else{  return product }
        } )
        storeProducts(productsEdit);
        return res.redirect('/')
    }
    

}