const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"))
module.exports = {
    register : (req,res) => {
        return res.render('users/register')
    },
    login : (req,res) => {
        return res.render('users/login')
    },
    admin : (req,res) => {
        return res.render('users/admin',{
            title:"administracion", 
            products: JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"))
        })
    }  ,
    add:(req,res) => {
        return res.render('users/add')
    }
}