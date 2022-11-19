const db=require('../../database/models')
const {literal}=require('sequelize')


module.exports = {
    all : async (req,res) => {
        try { 
            let options={ attributes: {
                exclude:["createdAt","updatedAt"],
                include:[[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/user/`,'userId)'),'userURL']]
            },
            include:[
            {
                association:'avatars',
                attributes:{
                    exclude:["createdAt","updatedAt"],
                   
                }
            }
         ]
        
    }
            /*let users = await db.User.findAll(options)*/
            let {count,rows}=await db.User.findAndCountAll(options)

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: count
                },
                data: {
                    users: rows
                }
            })
            
          

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message,
            });
            
        }

        
        
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