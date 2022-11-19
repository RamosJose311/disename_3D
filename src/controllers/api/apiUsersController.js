


module.exports = {
    all : async (req,res) => {
        /* devuelve todos los usuarios */
        return res.json({
            algun : "Estoy llegando all"
        })
    },
    getOne : async (req,res) => {
        /* devuelve solo un usuario */
        return res.json({
            algun : "Estoy llegando getOne"
        })

    },
    getAvatar : async (req,res) => {
        /* devuelve la imagen de perfil del usuario */
        return res.json({
            algun : "Estoy llegando getAvatar"
        })

    }
}