const {check,body} = require ('express-validator');
const {loadUser} = require ('../data/dbModules');

module.exports = [
    check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
       .withMessage('Debe ser un valor valido'),
    
    
    check('apellido')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
        .withMessage('Debe ser un valor valido'),
       
     
    check('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email valido'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            const user = loadUser().find(user => user.email === req.body.email && (user.password === value)   )
                return user ? true : false
        }).withMessage('Alguno de los datos no es valido'),

]
