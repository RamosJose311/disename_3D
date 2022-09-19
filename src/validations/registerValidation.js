const {check,body} = require ('express-validator');
const {loadUser} = require ('../data/dbModules');

module.exports = [
    check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isAlpha('es-ES',{ignore: ' '}).withMessage('Debe ingresar valores alfabeticos'),
    
    
    check('apellido')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isAlpha('es-ES',{ignore: ' '}).withMessage('Debe ingresar valores alfabeticos'),
       
     
    body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email valido').bail()
    .custom((value, {req}) => {
        const user = loadUser().find(user => user.email === value)   
            return user ? false : true
    }).withMessage('El mail ingresado existe'),


    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({
            min:5,
            max:12
        }).withMessage('La contraseña debe tener entre 5 y 12 caracteres'),

    body('password2')
        .notEmpty().withMessage('Debe repetir la contraseña').bail()
        .custom((value, {req}) => {
              const pass= req.body.password
              if (pass === value){
                return true;
              } else {
                return false
              }
        }).withMessage('La contraseña ingresada no es igual'),


]
