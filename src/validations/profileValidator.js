const {check,body} = require ('express-validator');
const db = require('../database/models');

module.exports = [
    check('firstName')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isAlpha('es-ES',{ignore: ' '}).withMessage('Debe ingresar valores alfabeticos'),
    
    
    /* check('lastName')
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
    }), */




]