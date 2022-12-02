const {check,body} = require ('express-validator');
const {loadUser} = require ('../data/dbModules');
const db = require('../database/models');

module.exports = [
    check('firstName')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isAlpha('es-ES',{ignore: ' '}).withMessage('Debe ingresar valores alfabeticos').bail()
    .isLength({
            min:2,
        }).withMessage('El Nombre debe tener un minimo de 2 caracteres'),
    
    
    check('lastName')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isAlpha('es-ES',{ignore: ' '}).withMessage('Debe ingresar valores alfabeticos').bail()
    .isLength({
            min:2,
        }).withMessage('El Apellido debe tener un minimo de 2 caracteres'),
    
    
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
            min:6,
            max:12
        }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('password2')
        .notEmpty().withMessage('Debe repetir la contraseña').bail()
        .custom( (value, {req}) => {
            return req.body.password !== value ? false : true
        }).withMessage('Las contraseñas no coinciden'),


]
