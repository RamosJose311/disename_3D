const {loadUser} =require ("../data/dbModules")

module.exports = {
    login : (req,res) =>{
        return res.render('login')
    },

    register : (req,res) =>{
        return res.render('register')
    },
    processRegister :(req,res) =>{
        const {nombre,apellido,email,password,} =req.body;
        const usuario=loadUser;

        const nuevoUsuario={
            Id:usuario[usuario.length=1] ? usuario[usuario.length=1].id+1:1,
            nombre:nombre.trim(),
            apellido:apellido.trim(),
            email:email.trim(),
            password ,
            Rol:"user",
            avatar:null,


        }

        const userModify=[...usuario,nuevoUsuario];

        storeUser(userModify);
        return res.redirec('/users/login')
    }
    
 }