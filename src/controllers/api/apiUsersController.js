const db=require('../../database/models')
const fs = require ('fs');
const path = require ('path');
const { literal} = require('sequelize');
const createError = require('../../helpers/createError')

module.exports = {
        
    /* Retorna los datos de todos los usuarios || opcion de uso de paginación */
    getAllUsers : async (req,res) => {

        try {
                                                                                       // Parametro para poder paginar
                let {limit = 10, page = 1} = req.query;
                limit = limit > 10 ? 10 : +limit;
                page = +page;
                let offset = +limit * (+page - 1);
                        
                let count = await db.User.count();                              //Se obtiene el total de Usuarios
            
                const users = await db.User.findAll({                           //Se obtienen todos los Usuarios
                            limit,
                            offset,
                            include :[                                          //Se relaciona la tabla vinculada AVATAR
                                {
                                    association : 'avatars',
                                    attributes :{
                                       exclude :['id','userId','createdAt','updatedAt'],
                                       include : [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/users/avatar/',avatar)`),'url']]
                                    }
                                },
                                {                                               //Se relaciona la tabla vinculada GENDER
                                    association : 'genders',
                                    attributes :{
                                       exclude :['id','createdAt','updatedAt'],
                                    }
                                },
                            ],
                                                                                //Atributos a excluir de Users
                            attributes :{                                        
                                exclude :['createdAt', 'updatedAt','password','genderId']
                            }                            
                        });

                                                                                //creacion de URL del Usuario en particular
                users.forEach(user => {
                    user.setDataValue('link',`${req.protocol}://${req.get('host')}${req.originalUrl}/${user.id}`)
                });


                                                                                //Configuración de Información para botones Next and Prev
                const queryKeys = {
                    limit:+limit,
                } 
                let queryUrl = "";
                for (const key in queryKeys) {
                    queryUrl += `&${key}=${queryKeys[key]}`
                }
                const existPrev = page > 1;
                const existNext = offset + limit < count;

                                                                                //creacion de URL para botones Next and Prev
                const prev =  existPrev ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page - 1}${queryUrl}` : null;
                const next = existNext ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page + 1}${queryUrl}` : null;

            // RETORNO DEL PRODUCTO CON SUS ATRIBUTOS
                return res.status(200).json({
                    meta : {
                        Search_User: "Ok",
                        Avatar: "Ok",
                        Gender: "Ok",
                        status : 200,
                    },
                    data :{
                        Total_User :count,
                        Users : users,
                        Page : page,
                        Page_prev :prev, 
                        Page_next :next
                    }
                })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                status : error.status || 500,
                msg : error.message
            })
        }
    },

    
    /* Retorna los datos de un solo usuario */
    getOneUser : async (req,res) => {
        const {id} = req.params;
        try {
            if(isNaN(id)){                                                    //Verificación de que Id debe ser un número caso contrario ERROR
                throw createError(400,'El ID debe ser un numero');
            }

            const user = await db.User.findByPk(id,{                          // Busqueda de un Usuario por Id
                        include :[                                            // Incluye la Tabla asociada Avatar
                            {
                                association : 'avatars',
                                attributes :{                      
                                    exclude :['id', 'userId', 'createdAt','updatedAt'],                                                      //Excluye los campos indicados de la tabla User'
                                    include : [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/users/avatar/',avatar)`),'url']]   //Incluye la url creada
                                }
                            },
                            {
                                association : 'genders',                      // Incluye la Tabla asociada Gender
                                attributes :{
                                   exclude :['id','createdAt','updatedAt'],
                                }
                            },

                        ],
            
                        attributes :{                                         
                            exclude :['createdAt', 'updatedAt', 'password']   //Excluye los campos indicados de la tabla User'
                        }
                    });

            if(!user){                                                        //Verificación de que el usuario debe existir caso contrario ERROR
                throw createError(404,'No existe un Usuario con ese ID');
            }

             return res.status(200).json({                                    //Muestra resultado de la Busqueda por Id
                meta : {
                    Search_User: "Ok",
                    Avatar: "Ok",
                    Gender: "Ok",
                    status : 200,
                },
                data : user
            })


        } catch (error) {                                                     // CATCH ABSORVE LOS ERRORES QUE SURGEN
            return res.status(error.status || 500).json({
                            search_User: "No Process",
                            status : error.status || 500,
                            msg:error.message,
                        });
        }
    },

    /* Permite visualizar el Avatar de un Usuario */
    getAvatar : async (req,res) => {
        console.log(req.params.avatar)
        return res.sendFile(path.join(__dirname,'..', '..','..','public','images','imgUsers', req.params.avatar ))
    },


    /* Busca en la base de datos si el email existe */
    verifyEmail : async (req,res) => {

        try {
            const {email} = req.body;
            let user = await db.User.findOne({
                where : {
                    email
                }
            })

            return res.status(200).json({
                ok : true,
                verified : user ? true : false
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                error : error.message
            })
        }
    }


}
