const {loadUser,storeUser} =require ("../data/dbModules")
const {validationResult, body} = require ('express-validator')
const {hashSync} =require('bcryptjs');
const db = require('../database/models')
const moment = require('moment');
const session = require("express-session");

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
            }).then(({id, firstName, lastName, rol}) => {
                req.session.userLogin = {
                    id,
                    firstName,
                    lastName,
                    rol : rol,
                    //avatar: user.avatar
                };
            req.body.remember && res.cookie('userLogin',req.session.userLogin, {maxAge : 1000 * 60});
    
            return res.redirect('/')
            })
            .catch(error => console.log(error))   
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
        const {firstName,lastName,rol,email,address,dateBirth}= req.body
        const errors =validationResult(req);
        if (errors.isEmpty()) { 
            db.User.findByPk(req.session.userLogin.id)
                .then(user =>{
                        db.User.update({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            address:address,
                            dateBirth:dateBirth

                            //avatar: req.file ? req.file.filename : this.avatar
                        }, 
                        {
                            where: {
                                id: req.session.userLogin.id
                            }
                        })
                        .then(() => {
                            req.session.userLogin = {
                                id: req.session.userLogin.id,
                                firstName:firstName,
                                lastName:lastName,
                                rol : rol,
                                address:address,
                                dateBirth:dateBirth,

                            };
                            res.redirect('/users/profile');
                        })
                })
                .catch(error => console.log(error))
         }  else {
                res.render('profile', {
                    errors: errors.mapped(),
                    //session: req.session,
                    old: req.body,
                    //userLogin : req.session.userLogin ? req.session.userLogin : ''
                })
            } 
        },



//terminado
    userDestroy: (req, res)=> {
        db.User.destroy({
            where :{
                id : req.session.userLogin.id
            }
        })
        .then(() => {
            req.session.destroy()
            if(req.cookies.userLogin){
                        res.cookie('userLogin', '', {maxAge: -1})
                    } 
            return res.redirect('/')
        })
        .catch( error => console.log(error))

    },
    userLogout: (req, res) => {
        req.session.destroy()
        if(req.cookies.userLogin){
            res.cookie('userLogin', '', {maxAge: -1})
        }
        res.redirect('/../users/login')
    }, 

}
