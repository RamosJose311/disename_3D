const {check,body} = require ('express-validator');
const {loadUser} = require ('../data/dbModules');
const bcryptjs = require ('bcryptjs');

module.exports = [
    check('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email valido'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            const user = loadUser().find(user => user.email === req.body.email && bcryptjs.compareSync(value,user.password))
                return user ? true : false
        }).withMessage('Alguno de los datos no es valido'),

]

