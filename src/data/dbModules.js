

const fs = require('fs');
const path = require('path');

const loadProducts = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'),'utf-8'))
}

const storeProducts = (products) => {
    fs.writeFileSync(path.join(__dirname,'products.json'), JSON.stringify(products, null, 3),'utf8')
}

const storeUser = (user) => {
    fs.writeFileSync(path.join(__dirname,'usuario.json'), JSON.stringify(user, null, 3),'utf8')
}
const loadUser =()  => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'usuario.json'),'utf-8'))
}

const loadCategories = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'categorias.json'),'utf-8'))
}



module.exports = {
    loadProducts,
    loadUser,
    storeProducts,
    storeUser,
    loadCategories
}






































