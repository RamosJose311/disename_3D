const {loadProducts,storeProducts,loadCategories} = require('../data/dbModules');
const {validationResult} = require('express-validator');


module.exports = {
    crearProducto : (req,res) =>{
        return res.render('crearProducto')
    },
    add : (req,res) => {
        return res.render('crearProducto',{
            categorias : loadCategories().sort()
        })
    },
    store : (req,res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            
            const{nombre, precio, descuento, altura, tiempo, categoria, descripcion, material}= req.body;
            let products = loadProducts();
            const newProduct = {
                id : products[products.length -1].id +1,
                nombre : nombre.trim(),
                precio : +precio,
                descuento :  +descuento,
                altura : +altura,
                tiempo : +tiempo,
                categoria: categoria,
                material : material,
                descripcion : descripcion.trim(),
                imagen : 'imagen-default.webp'
            }
            productsModify = [...products, newProduct];
            storeProducts(productsModify);
            return res.redirect('/')
            
        }else{
            return res.render('crearProducto', {
                errors : errors.mapped(),
                old : req.body
            })

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


