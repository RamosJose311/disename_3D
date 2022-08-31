const{loadProducts, storeProducts}= require('../data/dbModules')
module.exports = {
    crearProducto : (req,res) =>{
        return res.render('crearProducto')
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
        return res.redirect('/products/detalle')
    }
    

}