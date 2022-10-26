const {check,body} = require ('express-validator');
const {loadUser} = require ('../data/dbModules');
const db = require('../database/models');

module.exports = [
    check('firstName')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isAlpha('es-ES',{ignore: ' '}).withMessage('Debe ingresar valores alfabeticos'),
    
    
    check('lastName')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isAlpha('es-ES',{ignore: ' '}).withMessage('Debe ingresar valores alfabeticos'),
       
     
     body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email valido').bail()
    .custom( (value,{req}) => {
      return db.User.findOne({
        where : {
            email : value
        }
      }).then( user => {
            if(user) {
                return Promise.reject()
            }
      }).catch( () => Promise.reject('El email ingresado ya existe'))
    }),


    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({
            min:5,
            max:12
        }).withMessage('La contraseña debe tener entre 5 y 12 caracteres'),

    body('password2')
        .notEmpty().withMessage('Debe repetir la contraseña').bail()
        .custom( (value, {req}) => {
          return req.body.password !== value ? false : true
      }).withMessage('Las contraseñas no coinciden'),


]
