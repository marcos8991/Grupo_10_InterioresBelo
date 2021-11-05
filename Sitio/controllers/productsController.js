const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"))

const {validationResult} = require('express-validator');



module.exports = {


    cart : (req,res) => {
        return res.render('products/productCart')
    },
    
    
    detail : (req,res) => {
        
        return res.render('products/productDetail',{
            product : products.find(product => product.id === +req.params.id),
            products
        })
    },


    admin : (req,res) => {
        return res.render('users/admin',{
            title:"administracion", 
            products: JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"))
        })
    },



    //vista para añadir
    add:(req,res) => {
        return res.render('users/add')
    },

    //logica para añadir el producto
    store : (req,res) => {
        let errors = validationResult(req)
        
        if (errors.isEmpty()) {
            const {name,description,price,discount} = req.body;
        
            let product = {
                id : products[products.length - 1].id + 1,
                name : name.trim(),
                description:description.trim(),
                price : +price, 
                discount,
                image : req.file ? req.file.filename : 'no-image.png'
            
            }
            products.push(product);

            fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(products,null,3),'utf-8')
    
            return res.redirect('admin')
        }else{
            return res.render('users/add',{
                
                errors : errors.mapped(),
                old : req.body

            })
        }
        

        
    },
    
    

    //vista pra editar

    edit : (req,res) => {
        return res.render('users/edit',{
            product : products.find(product => product.id === +req.params.id)
            
        })
    },

    
    //logica para actualizar un producto
    update : (req,res) => {
        let errors = validationResult(req)
        let product = products.find(product => product.id === +req.params.id);
        if (errors.isEmpty()) {
            
            const {name,description,price,discount} = req.body;
           
            
            let productModified = {
                id : +req.params.id,
                name : name.trim(),
                description:description.trim(),
                price : +price, 
                discount,
                image : product.image
            
            }
        let productsModified = products.map(product => product.id === +req.params.id ? productModified : product)

        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productsModified,null,3),'utf-8')
        
        return res.redirect('/product/admin')
    
        }else{
            return res.render('users/edit',{
                
                errors : errors.mapped(),
                product
            })
        }
        
    },

    
    //borra un producto
    destroy : (req,res) => {
        let productsModified = products.filter(product => product.id !== +req.params.id)
        
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productsModified,null,3),'utf-8')

        res.redirect('/product/admin');
    } 
}