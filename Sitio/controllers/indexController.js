const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","products.json"),"utf-8"))

const db = require ('../database/models')
const {Op} =  require ('sequelize')


module.exports = {

    
    index : (req,res) => {
        let products = db.Product.findAll({
            where : {
                sectionId : {
                    [Op.gte] : 2
                }
            },
            limit : 3,
            include : ['images','section']
        })

        let novedades = db.Product.findAll({
            where : {
                sectionId : {
                    [Op.gte] : 1
                }
            },
            limit : 3,
            include : [
                'images',
                'section'
            ]
        })
        let sections = db.Section.findAll()

        Promise.all([products,sections,novedades])
        
        .then(([products,sections,novedades]) => {
            return res.render('index',{
                novedades,
                products,
                sections
            })
        })
        .catch(error => console.log(error))
        
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

       
    },
    nosotros : (req,res) => {
        return res.render('nosotros')
    },
}