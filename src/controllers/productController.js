module.exports = {
    detalle : (req,res) =>{
        return res.render('detalle')
    },
    productCart : (req,res) =>{
        return res.render('productCart')
    },
    archivo :(req,res) =>{
        return res.render('archivo')
    },
    personalizado:(req,res) =>{
        return res.render('personalizado')
    },
    proyecto :(req,res) =>{
        return res.render('proyecto')
    }

}