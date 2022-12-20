const {loadUser,storeUser} =require ("../data/dbModules")
const {validationResult, body} = require ('express-validator')
const {hashSync} =require('bcryptjs');
const db = require('../database/models')
const moment = require('moment');
const session = require("express-session");
const fs = require ('fs');
const path = require('path')

module.exports = {
    // CONTROLADOR QUE RENDERIZA LA VISTA PARA LOGUEARSE-OK
    login : (req,res) =>{
        return res.render('login')
    },
    

    //CONTROLADOR QUE TE LOGUEA-OK
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
            req.body.remember && res.cookie('disename3d',req.session.userLogin, {maxAge : 10000 * 60});
    
            return res.redirect('/')
            })
            .catch(error => console.log(error))   
        }else{
            return res.render('login',{
                errors:errors.mapped(),
                old:req.body
            })
        }
 
    },

    //CONTROLADOR QUE TE RENDERIZA LA VISTA PARA REGISTRARTE-OK
    register : (req,res) =>{
        return res.render('register')
    },


    //CONTROLADOR QUE TE REGISTRA-OK
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

                })
                
                .then( (result) => {
                    db.Avatar.create({
                        avatar:'default-img.webp',
                        userId: result.id
                    })
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
  //CONTROLADOR QUE TE RENDERIZA LA VISTA DE TU PERFIL
    profile:(req,res)=>{
        db.User.findByPk(req.session.userLogin.id,{
            include: [
                {
                    association : 'avatars',
                    attributes : ['avatar','userId']
                },
                {
                    association : 'genders',
                    attributes : ['name']
                }

            ],
        })
            //.then(response => response.json())
            .then(user => {
                //console.log(user)
                return res.render('profile',{
                    user,
                    moment,
                    
                })
            })

            .catch(error => console.log(error))
    },

    //CONTROLADOR QUE TE GUARDA LOS CAMBIOS EN EL PERFIL
    update : (req,res) => {
        
        const errors =validationResult(req);
        const {firstName,lastName,rol,email,address,dateBirth,avatar,city,province,description,genderId,country,genero}= req.body
        let avatarUser = "";
        //return res.send(req.body)
        if (req.file) {
            avatarUser = req.file
        }
    

    //return res.send(req.body)
        console.log(errors,'-------------------------------------------')
        if (errors.isEmpty()) { 
            db.User.findByPk(req.session.userLogin.id,{

                include: [
                    {
                        association : 'avatars',
                        attributes : ['avatar','userId']
                    },
                     {
                        association : 'genders',
                        attributes : ['name','id']
                    } 
    
                ],
            })
                .then(user =>{
                    //return res.send(user)
                        db.User.update({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            address:address,
                            dateBirth:dateBirth,
                            city:city,
                            province:province,
                            country:country,
                            description:description,
                            genderId: genero? genero : genderId
                        }, 
                        {
                            where: {
                                id: req.session.userLogin.id
                            }
                        })
                        .then((user) => {
                            //return res.send(req.session.userLogin)
                                let namefile = ""
                                if(avatarUser){
                                    namefile = avatarUser.filename
                                        console.log('------nombre:' + avatarUser.filename)
                                        console.log('------nombre2'+ namefile)
                                }else{
                                    namefile = "default-img.webp"
                                }
                                //return res.send(avatarUser)
                                if(req.file){
                                    
                                            /* fs.existsSync(path.resolve(__dirname,"..","..","public","images","imgProducts",req.file.filename)) &&
                                            fs.unlinkSync(path.resolve(__dirname,"..","..","public","images","imgProducts",req.file.filename)) */
                                    
                                    db.Avatar.destroy({
                                        where :{
                                            userId : req.session.userLogin.id
                                        }
                                    })
                                    db.Avatar.create({

                                        avatar: namefile,
                                        userId: req.session.userLogin.id
                                    })
                                
                                        .then(() =>{

                                        req.session.userLogin = {
                                            id: req.session.userLogin.id,
                                            firstName:firstName,
                                            lastName:lastName,
                                            rol : rol,
                                            address:address,
                                            dateBirth:dateBirth,
                                            avatar : namefile
            
                                        }
                                        res.redirect('/users/profile')
                                    })
                                        .catch(err => console.log(err))
                                }
                                res.redirect('/users/profile')
                                })

                            
                            
                        })
                .catch(error => console.log(error))
         }  else {
                res.render('profile', {
                    errors: errors.mapped(),
                    session: req.session,
                    old: req.body,
                    userLogin : req.session.userLogin ? req.session.userLogin : ''
                })
            } 
        },



//CONTROLADOR QUE TE DESTRUYE EL USIARIO DE LA BASE DE DATOS
    userDestroy: (req, res)=> {
        //return res.send(req.session.userLogin)
        db.Avatar.destroy({
            where :{
                userId: req.session.userLogin.id
            }
        })
        .then(() => {
            db.User.destroy({
                where: {
                    id: req.session.userLogin.id
                }
            })
        })

        .then(() => {
            req.session.destroy()
            if(req.cookies.disename3d){
                        res.cookie('disename3d', '', {maxAge: -1})
                    } 
            return res.redirect('/')
        })
        .catch( error => console.log(error))

    },

    //CONTROLADOR QUE TE DESLOGUEA
    userLogout: (req, res) => {
        req.session.destroy()
        if(req.cookies.disename3d){
            res.cookie('disename3d', '', {maxAge: -1})
        }
        res.redirect('/../users/login')
    }, 

}
