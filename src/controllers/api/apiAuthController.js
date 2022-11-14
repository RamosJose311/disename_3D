const db = require("../../database/models");              // A la constante db le asigno los modelos de la base de datos
const {hashSync} = require ('bcryptjs');                  // Se requiere modulo para encriptar password 
const {validationResult} = require ('express-validator'); // Se requiere express-validator para validar a travez de middleware
const {sign} = require('jsonwebtoken');                   // Se requiere jsonwebtoken para obtener un Token de seguridad
const { param } = require("../../routes");


module.exports = {
     /* Registro al usuario y devuelvo un token */
     processRegister: async (req,res) => {
 

        try {
            let errors=validationResult(req)            
            const {firstName, lastName, email, password} = req.body
            errors = errors.mapped()
            if(Object.entries(errors).length === 0){
                const user = await db.User.create({
                    firstName : firstName.trim(),
                    lastName : lastName,
                    email: email,
                    password : hashSync(password,10),
                    rol : false,
                })

                const avatar = await db.Avatar.create({
                    avatar : 'default-img.webp',
                    userId: user.id
                })

                const token = sign(
                    { id: user.id,
                      rol: user.rol  
                    },
                    process.env.SECRET_TOKEN,
                    {
                        expiresIn:'1h'
                    }
                )

                res.status(201).json({
                    status : 201,
                    meta:{
                        User_Create: 'Ok',
                        Avatar_charge: 'Ok'
                    },
                    data:{
                        data : user,
                        avatar : avatar,
                    }, 
                    Security: {Token:token}               
                })

            }else{
                let msgErrorsObjet = {}
// Errors es un objeto.. por eso tiene mapped()
                for (const property in errors) {
                    console.log(msgErrorsObjet)
                    msgErrorsObjet = {
                        ...msgErrorsObjet,
                        [property] : errors[property].msg
                    } 
                  }

// Si errors fuera un array sin mapped() 
/*                 errors.errors.forEach(error => {
                    msgErrorsObjet = {
                        ...msgErrorsObjet,
                       [error.param] : error.msg
                    } 
                })                    
 */                 
                res.json({
                    meta:{
                        User_Create: "No process"
                    },
                    validatorErrors: msgErrorsObjet 
                    }               
                )
            } 
        } catch (errors) {
            console.log (errors)
        }
  },



    processLogin : async (req,res) => {
        /* autenticación de usuario y token */
        return res.json({
            mensaje : "que bien llegas"
        })
    },
}