const fs = require("fs");
const path = require("path");
const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "products.json"), "utf-8")
);

const { validationResult } = require("express-validator");
const { Op } = require('sequelize')
const db = require("../database/models");

module.exports = {
  cart: (req, res) => {
    return res.render("products/productCart");
  },

  detail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [{ all: true }]
    })
      .then(product => {
        db.Category.findByPk(product.categoryId, {

          include: [{
            association: 'products',
            include: ['images'],
            where : {
              id :{
                [Op.ne]: product.id, 
              } 
            },
          }]
        })
          .then(category => {
            return res.render("products/productDetail", {
              product,
              products: category.products
            });
          })
      })

  },

  admin: (req, res) => {
    let products = db.Product.findAll({
      include: [{ all: true }]
    })
    let section = db.Section.findAll()
    
    Promise.all([products, section])
      .then(([products, section]) => {

         /*  return res.send(products) */
        return res.render('users/admin', {
          products,
          
          section
        })
      })
      .catch(error => console.log(error))
  },




  //vista para añadir
  add: (req, res) => {

    let categories = db.Category.findAll() 
    let section = db.Section.findAll()

    Promise.all([categories,section])

      .then(([categories,sections]) => {
        return res.render("users/add", {
          
          categories,
          sections
          
          
        });
      })
      .catch((error) => console.log(error));
  },


  //logica para añadir el producto
  store: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {

      const { name, description, price, section, discount,category } = req.body;
      db.Product.create({
        name: name.trim(),
        description: description.trim(),
        price,
        discount,
        categoryId:category,
        sectionId: section,
      })
        .then(product => {
          if (req.file != undefined) {
            let image = [req.file].map(image => {
              let img = {
                file: image.filename,
                productId: product.id
              }
              return img
            })
            db.Image.bulkCreate(image, { validate: true })
              .then(() => console.log('Imagen agregada'))
          } else {
            db.Image.create({
              file: 'no-image.png',
              productId: product.id
            })
              .then(() => console.log('Imagen por defecto agregada'))

          }
          return res.redirect('/products/admin')
        })
        .catch(error => console.log(error))

    } else {
      db.Section.findAll()
        .then((sections) => {
          return res.render("users/add", {
            sections,
            errors: errors.mapped(),
            old: req.body
          })
        })
        .catch((error) => console.log(error));
    }
  },

  //vista pra editar

  edit: (req, res) => {

    let product = db.Product.findByPk(req.params.id,{
      include : [{all:true}]
    })
    let categories = db.Category.findAll() 
    let section = db.Section.findAll()

    Promise.all([product,categories,section])

      .then(([product,categories,sections]) => {
        return res.render("users/edit", {
          categories,
          product,
          sections
        })
      })
      .catch(error => console.log(error))
  },



  //logica para actualizar un producto
  update: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const { name, description, price, discount, section ,category} = req.body;

      db.Product.update({

        name: name.trim(),
        description: description.trim(),
        price,
        discount,
        categoryId : category,
        sectionId: section
      },
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then(() => {
          db.Image.destroy({
            where: {
              productId : req.params.id
            }
          }).then( () =>{
            if (req.file) {
              let image = [req.file].map(image => {
                let img = {
                  file: image.filename,
                  productId: req.params.id
                }
                return img
              })
              db.Image.bulkCreate(image, { validate: true })
                .then(() => res.redirect('/products/admin'))
                .catch(error => console.log(error))
            } else {
              db.Image.create({
                file: 'no-image.png',
                productId: req.params.id
              })
                .then(() => res.redirect('/products/admin'))
                .catch(error => console.log(error))
  
            }
            
          }).catch(error => console.log(error))
          
          
        }).catch(error => console.log(error))

    } else {
      let product = db.Product.findByPk(req.params.id)
      let sections = db.Section.findAll()
      let categories = db.Category.findAll()
      
      Promise.all([product, sections,categories])


        .then(([product, sections,categories]) => {
          return res.render('users/edit', {
            categories,
            sections,
            product,
            
            errors: errors.mapped()
          })
        })
        .catch(error => console.log(error))
    }

  },

  //borra un producto
  destroy: (req, res) => {

    let imageDestroy = db.Image.destroy({
      where: {
        productId: req.params.id
      }
    })

    let productDestroy = db.Product.destroy({
      where: {
        id: req.params.id,
      }
    })
    Promise.all([imageDestroy, productDestroy])


      .then(() => {
        return res.redirect("/products/admin");
      })
      .catch(error => console.log(error))

  },
  filter: (req, res) => {
    db.Product.findAll({
      where: {
        categoryId: +req.query.category
      },
      include: [{ all: true }]
    })
      .then(products => {
        return res.render('./products/products', {
          products
        })
      })
      .catch(error => console.log(error))
  }
};
