const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"))

module.exports = {
    index : (req,res) => {
        return res.render('index',{
            product : products.find(product => product.id === +req.params.id)
        })
    } 
}