const db = require('../../database/models');
const fs = require ('fs');
const path = require ('path');
const { literal,} = require('sequelize');
const createError = require('../../helpers/createError')


module.exports = {
    //terminado
    all : async (req,res) => {
        
        //console.log(req.body)
         try {
            //----------------- PAGINADO----------------
            let {limit = 10, page = 1} = req.query;

            limit = limit > 10 ? 10 : +limit;
			page = +page;
			let offset = +limit * (+page - 1);
            //-------------------------------------------
            
            //TOTAL DE PRODUCTOS
            let count = await db.Product.count();

            //MUESTRO TODOS LOS PRODUCTOS
            const products = await db.Product.findAll({
                /* where :{
                    discount : req.body.descuento
                } */
                limit,
				offset,
                include :[
                //----------------TABLAS VINCULADAS---------------------
                    {
                        association : 'categories',
                        attributes : {
                            exclude :['createdAt','updatedAt','id']
                        }
                    },
                    { association :'materials',
                        attributes :{
                            exclude :['createdAt','updatedAt','id']
                        }
                    },
                {
                    association : 'images',
                    attributes :{
                        exclude :['createdAt','updatedAt','productsId','id'],
                        include : [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/imagen/',file)`),'url']]
                    }
                }
                //---------------------------------------------------------
            ],

            //ATRIBUTOS EXCLUIDOS DE LA TABLA 'PRODUCTS'
                attributes :{
                    exclude :['createdAt', 'updatedAt','discount','height','time','materialId','categoryId']
                },
                
                

            });
            //URL DEL PRODUCTO
            products.forEach(product => {
                product.setDataValue('link',`${req.protocol}://${req.get('host')}${req.originalUrl}${product.id}`)
            });

            // ARMADO DE LA URL PARA LOS BOTONES PREV,NEXT

             const queryKeys = {
				limit:+limit,
			} 
             let queryUrl = "";

			for (const key in queryKeys) {

				queryUrl += `&${key}=${queryKeys[key]}`
			
			}

            // BOTONES PREV,NEXT
			const existPrev = page > 1;
			const existNext = offset + limit < count;

			const prev =  existPrev ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page - 1}${queryUrl}` : null;
			const next = existNext ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page + 1}${queryUrl}` : null;

            // RETORNO DEL PRODUCTO CON SUS ATRIBUTOS
            return res.status(200).json({
                data :{
                count,
                productos : products,
                page,
				prev, 
				next
                }
                
            })

            //ERRORES
         } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                status : error.status || 500,
                msg : error.message
            })
            
         }   
    },
    
    
    
    
    getOne : async (req,res) => {
        /* devuelve solo un producto */
        const {id} = req.params;
        //MENSAJE DE ERROR ID INVALIDA
        try {
            if(isNaN(id)){
                throw createError(400,'El ID debe ser un numero');
            }
            // BUSCO EL PRODUCTO
                /* const back =  */
                const product = await db.Product.findByPk(id,{

                //-----------------------TABLAS VINCULADAS---------------------
                include :[
                {
                    association : 'categories',
                    attributes : {
                        exclude :['createdAt','updatedAt','id']
                    }
                },
                { association :'materials',
                    attributes :{
                        exclude :['createdAt','updatedAt','id']
                    }
                },
                {
                        association : 'images',
                    attributes :{
                        exclude :['createdAt','updatedAt','id','productsId'],
                        include : [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/imagen/',file)`),'url']]
                    }
                }
            //----------------------------------------------------------------
            ],
            
            //ATRIBUTOS EXCLUIDOS DE LA TABLA 'PRODUCTS'
                attributes :{
                    exclude :['createdAt', 'updatedAt','materialId','categoryId']
                }
                    });
                    //MENSAJE DE ERROR POR SI PONE UN ID QUE NO EXISTE
                    if(!product){
                        throw createError(404,'no existe una pelicula con ese ID');
                    }

                //RETORNO DEL PRODUCTO ENCONTRADO
                return res.status(200).json({
                data :{
                product,
                }
                
            })
            //ERRORES
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok:false,
                status : error.status || 500,
                msg:error.message,
            });
        }
    },
    getImageProduct : async (req,res) => {
        /* devuelve la imagen del producto */
        console.log(req.params.imagen)
        return res.sendFile(path.join(__dirname,'..', '..','..','public','images','imgProducts', req.params.img ))
    },




    getImage : async (req,res) => {
        /* devuelve la imagen un producto */
        const {id} = req.params;
        //MENSAJE DE ERROR ID INVALIDA
        try {
            if(isNaN(id)){
                throw createError(400,'El ID debe ser un numero');
            }
            // BUSCO EL PRODUCTO
                /* const back =  */
                const product = await db.Product.findByPk(id,{

                //-----------------------TABLAS VINCULADAS---------------------
                include :[
                {
                        association : 'images',
                    attributes :{
                        exclude :['createdAt','updatedAt','id','productsId','file'],
                        include : [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/imagen/',file)`),'url']]
                    }
                }
            //----------------------------------------------------------------
            ],
            
            //ATRIBUTOS EXCLUIDOS DE LA TABLA 'PRODUCTS'
                attributes :{
                    exclude :['createdAt', 'updatedAt','materialId','categoryId']
                }
                    });
                    //MENSAJE DE ERROR POR SI PONE UN ID QUE NO EXISTE
                    if(!product){
                        throw createError(404,'no existe una imagen con ese ID');
                    }

                //RETORNO DEL LA IMAGEN ENCONTRADA
                return res.status(200).json({
                data :{
                product : product.name,
                imagen : product.images
                }
                
            })
            //ERRORES
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok:false,
                status : error.status || 500,
                msg:error.message,
            });
        }
    },
}




