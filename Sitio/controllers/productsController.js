const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"))

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
         
        const {name,description,price,discount} = req.body;
        
        let product = {
            id : products[products.length - 1].id + 1,
            name : name.trim(),
            description:description.trim(),
            price : +price, 
            discount,
            image : 'no-image.png'
            
     }

        products.push(product);

        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(products,null,3),'utf-8')
    
        return res.redirect('admin')
    },
    
    

    //vista pra editar

    edit : (req,res) => {
        return res.render('users/edit',{
            product : products.find(product => product.id === +req.params.id)
            
        })
    },

    
    //logica para actualizar un producto
    update : (req,res) => {
       
        const {name,description,price,discount} = req.body;
        let productModified = {
            id : +req.params.id,
            name : name.trim(),
            description:description.trim(),
            price : +price, 
            discount : +discount,
            image : 'no-image.png'
            
     }
        let productsModified = products.map(product => product.id === +req.params.id ? productModified : product)

        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productsModified,null,3),'utf-8')
        return res.redirect('/product/admin')
    },

    
    //borra un producto
    destroy : (req,res) => {
        let productsModified = products.filter(product => product.id !== +req.params.id)
        
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productsModified,null,3),'utf-8')

        res.redirect('/product/admin');
    }
    

}