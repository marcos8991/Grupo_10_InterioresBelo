const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"))

const db = require ('../database/models')
const {Op} =  require ('sequelize')


module.exports = {
    index : (req,res) => {

       
        return res.render('index',{
            product : products.find(product => product.id === +req.params.id)
        })
    },
    search : (req, res) =>{
        db.Product.findAll({
            where :{ 
                [Op.or] :{
                   name : {
                    [Op.substring] : req.query.keywords
                }, 
                  description : {
                    [Op.substring] : req.query.keywords
                },
                //   sectionId: {
                //     [Op.substring] : req.query.keywords
                // }
                }
                
            },
            include : [{all : true}]
        })
        .then( products =>{
            //  return res.send(products)
            return res.render('search',{
            products,
			keywords : req.query.keywords
        }) 
        })
        .catch((error) => console.log(error));

       
    }
}