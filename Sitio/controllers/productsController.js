const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"))

module.exports = {
    cart : (req,res) => {
        return res.render('products/productCart')
    },
    detail : (req,res) => {
        return res.render('products/productDetail')
    },


    admin : (req,res) => {
        return res.render('users/admin',{
            title:"administracion", 
            products: JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"))
        })
    }  ,
    add:(req,res) => {
        return res.render('users/add')
    },
    edit:(req,res) => {
        return res.render('users/edit')
    }
    

}