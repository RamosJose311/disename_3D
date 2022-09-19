const {loadUser,storeUser} =require ("../data/dbModules")
const {validationResult} = require ('express-validator')
const bcryptjs =require('bcryptjs')

module.exports = {

    login : (req,res) =>{
        return res.render('login')
    },

    processLogin : (req,res) => {
        const errors = validationResult(req)
        
        if(errors.isEmpty()){
            const {id,nombre,rol} = loadUser().find(user => user.email === req.body.email);

            req.session.userLogin = {
                id,
                nombre,
                rol
            }

            return res.redirect('/')                              //redirigir a algun lado 
        } else{
            return res.render('login', {
                errors:errors.mapped()
            })
        }
 
    },

    register : (req,res) =>{
        return res.render('register')
    },

    processRegister :(req,res) =>{
        const errors =validationResult(req);
        const {nombre,apellido,email,password} =req.body;
        const usuario= loadUser();
        if(errors.isEmpty()){
            const nuevoUsuario={
            id:usuario[usuario.length-1] ? usuario[usuario.length-1].id+1:1,
            nombre:nombre.trim(),
            apellido:apellido.trim(),
            email:email.trim(),
            password :bcryptjs.hashSync(password.trim(),10),
            rol:"user",
            nacimiento: null,
            imagen:null,
            genero:null,
            hobbies : [],
            domicilio: null,
            ciudad: null,
            provincia: null,
            nosotros: null
        } 
        const userModify=[...usuario,nuevoUsuario];

        storeUser(userModify);

        return res.redirect('/users/login')
     }else {
        return res.render('register',{
            errors:errors.mapped(),
            old:req.body
        })
     }
    },



    profile:(req,res)=>{
        const user = loadUser().find(user => user.id === req.session.userLogin.id)
        
        return res.render('profile', {
            user
        })
    },


    update : (req,res) => {
        
        const {nombre,apellido,nacimiento,domicilio,ciudad,provincia,nosotros} = req.body
        const users = loadUser();

        let usersModify = users.map(user => { 

            if(user.id === +req.params.id){
                return{
                    ...user,
                    ...req.body
                } 
            }
            return user
        });

        req.session.userLogin = {
            ...req.session.userLogin,
            nombre
        }
        
        storeUser(usersModify);
        return res.redirect('/users/profile')


    },



    logout: (req, res)=> {
        req.session.destroy();
        return res.redirect('/');
    }

}
