
module.exports = (req,res,next) => {
    if(req.cookies.disename3d){
        req.session.disename3d = req.cookies.disename3d
    }
    next()
}