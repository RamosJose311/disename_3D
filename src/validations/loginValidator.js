const {check,body} = require ('express-validator');
const {loadUser} = require ('../data/dbModules');
//const bcryptjs = require ('bcryptjs');
const db = require('../database/models');
const {compareSync} = require('bcryptjs');

module.exports = [
    check('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email valido'),


    check('password')
        .notEmpty().withMessage('debe ingresar su contraseña').bail(),

    body('password')
        .custom( (value,{req}) => {
            return db.User.findOne({
                where : {
                    email : req.body.email
                }
            }).then( user => {
                console.log('-----------------------------'+ user)
                if(!user || !compareSync(value, user.password)) {
                    return Promise.reject()
                }
              /* }).then( user => {
                console.log(user)
                if(!bcryptjs.compareSync(value, user.dataValues.password)){
                    return Promise.reject()} */
   
              }).catch( () => Promise.reject('Alguno de los datos no es valido'))
        })

]

