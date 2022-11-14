
const {verify} = require ('jsonwebtoken')

const checkToken =  (req, res, next) => {

    try {

        const token = req.header('authorization');
        if (!token){
             throw res.status(403).json({
                message : 'No tienes autorizacion',
            })
        } 

        verify(token,process.env.SECRET_TOKEN, function (err, decoded) {
            if(err){
                throw res.status(401).json({
                    message: 'Toke inválido'
                })
            }
            req.userToken = decoded
        });
        next()    
     
    } catch (error) {
        res.json({error})
    }

}

module.exports = {
    checkToken
}