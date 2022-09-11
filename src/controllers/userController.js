module.exports = {
    login : (req,res) =>{
        return res.render('login')
    },

    register : (req,res) =>{
        return res.render('register')
    },

    processLogin : (req, res) => {
        return res.send(req.body)
    }
}