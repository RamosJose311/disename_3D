const db=require('../../database/models')
const fs = require ('fs');
const path = require ('path');
const { literal} = require('sequelize');
const createError = require('../../helpers/createError')

module.exports = {
    all : async (req,res) => {
        try { 
            let options={ attributes: {
                exclude:["createdAt","updatedAt"],
                include:[[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/user/`,'userId)'),'userURL']]
            },
            include:[
            {
                association:'avatars',
                attributes:{
                    exclude:["createdAt","updatedAt"],
                   
                }
            }
         ]
        
    }
            /*let users = await db.User.findAll(options)*/
            let {count,rows}=await db.User.findAndCountAll(options)

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: count
                },
                data: {
                    users: rows
                }
            })
            
          

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message,
            });
            
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
                            }
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
                    search_User: "Ok",
                    Avatar: "Ok",
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


}
