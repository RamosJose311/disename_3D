const {loadUser,storeUser} =require ("../data/dbModules")
const {validationResult} = require ('express-validator')

module.exports = {
    login : (req,res) =>{
        return res.render('login')
    },

    processLogin : (req,res) => {
        const errors = validationResult(req)
        
        if(errors.isEmpty()){
            const {id,nombre,Rol} = loadUser().find(user => user.email === req.body.email);

            req.session.userLogin = {
                id,
                nombre,
                Rol
            }

            return res.render('inicio')                              //redirigir a algun lado 
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
        
        const {nombre,apellido,email,password} =req.body;
        const usuario= loadUser();

        const nuevoUsuario={
            id:usuario[usuario.length-1] ? usuario[usuario.length-1].id+1:1,
            nombre:nombre.trim(),
            apellido:apellido.trim(),
            email:email.trim(),
            password ,
            Rol:"user",
            avatar:null,


        }

        const userModify=[...usuario,nuevoUsuario];

        storeUser(userModify);
        return res.redirect('/users/login')
    }
    
 }