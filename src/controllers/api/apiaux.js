const db = require ('../../database/models')


module.exports = {
    /* devuelve todos los usuarios */
    UserAll : async (req,res) => {

        const users = await db.User.findAll()


        return res.json({
            usuario : users
        })

    },

    UserGetOne : async (req,res) => {
        /* devuelve solo un usuario */
    },

    UserGetAvatar : async (req,res) => {
        /* devuelve la imagen de perfil del usuario */
    }
}