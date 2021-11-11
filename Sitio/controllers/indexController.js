const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"))

const db = require ('../database/models')


module.exports = {
    index : (req,res) => {

        // db.Product.findAll()
        // .then(products => {
        //     return res.send(products)
        // })
        // .catch(error => console.log(error))
        return res.render('index',{
            product : products.find(product => product.id === +req.params.id)
        })
    } 
}