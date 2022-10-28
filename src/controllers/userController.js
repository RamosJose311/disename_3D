const {loadUser,storeUser} =require ("../data/dbModules")
const {validationResult, body} = require ('express-validator')
const {hashSync} =require('bcryptjs');
const db = require('../database/models')
const moment = require('moment');

module.exports = {

    login : (req,res) =>{
        return res.render('login')
    },
    // terminado
    processLogin : (req,res) => {  
        const errors = validationResult(req)
        if(errors.isEmpty()){
            db.User.findOne({
                where : {
                    email : req.body.email
                }
            }).then(({id, firstName, rol}) => {
                req.session.userLogin = {
                    id,
                    firstName,
                    rol : rol
                };
            return res.redirect('/')
            })
            .catch(error => console.log(error))  //redirigir a algun lado 
        }else{
            return res.render('login', {
                errors:errors.mapped()
            })
        }
 
    },

    register : (req,res) =>{
        return res.render('register')
    },


    //terminado
    processRegister :(req,res) =>{

        const errors =validationResult(req);
        const {firstName,lastName,email,password} =req.body;
        if(errors.isEmpty()){

            db.User.create({
                firstName : firstName.trim(),
                lastName: lastName.trim(),
                email : email.trim(),
                password : hashSync(password, 10),
                rol : false,
                avatar : 'imagen-default.webp'
                })
                /* .then(user => {
                db.Address.create({
                    street: '',
                    city: '',
                    province: '',
                    postalCode: '',
                    number: '',
                    userId: user.id
                }) */
                .then( () => {
                    return res.redirect('/users/login')
                })
            .catch(error => console.log(error))
            
        }else{
        return res.render('register',{
            errors:errors.mapped(),
            old:req.body
        })
    }
},
  //terminado
    profile:(req,res)=>{
        db.User.findByPk(req.session.userLogin.id)
            .then(user => {
                return res.render('profile',{
                    user,
                    moment,
                })
            })
            .catch(error => console.log(error))
    },


    update : (req,res) => {
        const {firstName,lastName,rol,email}= req.body
        const errors =validationResult(req);
        
        if (errors.isEmpty()) {
            db.User.findByPk(req.session.userLogin.id)
            .then(user =>{
                db.User.update({
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                    //avatar: req.file ? req.file.filename : this.avatar
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                
                    .then(() => {
                        res.redirect('/users/profile');
                    })
                })
            }else {
                res.render('profile', {
                    errors: errors.mapped(),
                    session: req.session,
                    old: req.body,
                    userLogin : req.session.userLogin ? req.session.userLogin : ''
                })
            }
            
        },



//terminado
    logout: (req, res)=> {
        db.User.destroy({
            where :{
                id : req.params.id
            }
        })
        .then(() => {
            req.session.destroy()
            return res.redirect('/')
        })
        .catch( error => console.log(error))

    }

}
