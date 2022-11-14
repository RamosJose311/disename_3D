const {loadProducts,storeProducts,loadCategories} = require('../data/dbModules');

const {validationResult} = require('express-validator');

const db = require('../database/models')
const sequelize = db.sequelize;
const moment = require('moment');
const fs = require ('fs');
const path = require('path')



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

        errors = errors.mapped();
        if (req.fileValidationError){
            errors ={
                ...errors,
                imageProduct : {
                    msg:req.fileValidationError
                }
            }
        } 

        if(Object.entries(errors).length === 0){
            const {name, price, discount, heigth, time, categoryId, materialId,description,view,imagen} = req.body;
            let array = [];
            if (req.files) {
                    array = req.files
                }

            db.Product.create({
                ...req.body,
                name:req.body.name.trim(),
                categoryId: req.body.categoryId,
                materialId: req.body.materialId,
                view : "stock"
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
            let categories = db.Category.findAll()
            let materials = db.Material.findAll()
            //return res.send(errors)
            //console.log("--------NUEVA IMAGEN------>"+req.files[0].filename);
            if (req.files.length > 0){
                req.files.forEach(({filename}) => {
                    fs.existsSync(path.resolve(__dirname,"..","..","public","images","imgProducts",filename)) &&
                    fs.unlinkSync(path.resolve(__dirname,"..","..","public","images","imgProducts",filename))
                });
            } 
            //return res.send(req.body)

            Promise.all([categories,materials])
                .then(([categories,materials]) => { 
                    //return res.send(req.body)
                    res.render('crearProducto',{
                        categories,
                        materials,
                        errors : errors,
                        old : req.body
                    })})
                    .catch(error => console.log(error))
            }
        }, 

    //Renderiza EditarProducto con datos - OK
    editarProducto : (req,res) => {
        let categories = db.Category.findAll()
        let materials = db.Material.findAll()

        let product = db.Product.findByPk(req.params.id,{
            include: [
                {
                    association : 'images',
                    attributes : ['id', 'file','productsId']
                }
            ]});

            Promise.all([categories,materials,product])
            .then(([categories,materials,product]) => {
                res.render('editarProducto', {
                    product,
                    categories,
                    materials
                })
            })
            .catch(error => console.log ("=====ERROR======>" + error))
    },



    //Proceso de Actualizar en Base de Datos y Renderiza Detail - OK
    update : (req, res) =>{
        let errors = validationResult(req);

        // Evaluacion de errores de IMAGEN - Solo se permite imagen
         errors = errors.mapped();
         if (req.fileValidationError){
            errors ={
                ...errors,
                imageProduct : {
                    msg:req.fileValidationError
                }
            }
        } 

        // proyecto de agregar mas de una imagen ... por ahora solo una.. carga una nueva imagen
        let arrayImages = [];
        if (req.files) {
            console.log(req.files)
            for (clave in req.files) {
                array = req.files[clave]
                console.log(array)
                arrayImages.push(`${array.filename}`);
                console.log("-----este valor toma imagen---->    " + arrayImages)
            }
        }


        if (Object.entries(errors).length === 0) {
            const {name, price, discount, heigth, time, categoryId, materialId,description,view,imagen} = req.body;
                
            db.Product.update(
                {
                    ...req.body,
                    name:req.body.name.trim(),
                    categoryId: req.body.categoryId,
                    materialId: req.body.materialId,
                },
                {
                    where : {id:req.params.id}
                }
            )
            .then (() => {
                // Condicional que controla si se carga  una nueva imagen
                if (arrayImages.length > 0) {
                    db.Image.findOne({
                        where: {
                            file: req.body.imageOldName
                        }
                    })
                    .then( result => {

                        console.log("--------------------dato viejo----------------------")
                        console.log(result)
                        console.log(result.id)
                        console.log(result.file)
                        console.log("----------------------------------------------------")

                        db.Image.destroy({
                            where: {
                                id: result.id
                            }
                        })

                        // Si la imagen al momento de cargar el producto es por defecto... esta imagen no se borra (es imagen general)
                        if(result.file !== "No_Image.png"){
                            fs.existsSync(path.resolve(__dirname,"..","..","public","images","imgProducts",result.file)) &&
                            fs.unlinkSync(path.resolve(__dirname,"..","..","public","images","imgProducts",result.file))
                        }



                        console.log("--------------------dato nuevo----------------------")
                        console.log(arrayImages)
                        console.log(arrayImages[0])
                        console.log("----------------------------------------------------")

                        db.Image.create({
                            file: arrayImages[0],
                            productsId: req.params.id
                        }) 
                    })
                }
                return res.redirect('/../products/detalle/'+ req.params.id)
            })
            .catch(error => console.log("//////  Error 001: "+ error))

        }else{

             if (req.files.length > 0){
                req.files.forEach(({filename}) => {
                    fs.existsSync(path.resolve(__dirname,"..","..","public","images","imgProducts",filename)) &&
                    fs.unlinkSync(path.resolve(__dirname,"..","..","public","images","imgProducts",filename))
                });
            } 

            
            let categories = db.Category.findAll()
            let materials = db.Material.findAll()
    
            let product = db.Product.findByPk(req.params.id,{
                include: [
                    {
                        association : 'images',
                        attributes : ['id', 'file','productsId']
                    }
                ]});
    
                Promise.all([categories,materials,product])
                .then(([categories,materials,product]) => {
                    res.render('editarProducto', {
                        product,
                        categories,
                        materials,                        
                        errors : errors,
                        old : req.body

                    })
                })
                .catch(error => console.log ("=====ERROR======>" + error))

        }
        
        },



    //Consulta para Borrar en Base de Datos - POR APLICAR
    delete: function (req, res) {
        db.Product.findByPk(req.params.id)
         .then(product => {
             res.render('productDelete',{
             product
         })})
         .catch(error => console.log(error))
     },


    //Proceso de Borrar en Base de Datos y Renderiza Home - OK
    destroy: function (req, res) {
        db.Image.destroy({
            where : {
                productsId : req.params.id
            }
        })
        .then( () => {
            db.Product.destroy({
                where : {
                    id : req.params.id
                }
            })
            return res.redirect('/')
        })
        .catch(error => console.log(error))
    }
}


