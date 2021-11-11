const fs = require("fs");
const path = require("path");
const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "products.json"), "utf-8")
);

const { validationResult } = require("express-validator");

const db = require("../database/models");

module.exports = {
  cart: (req, res) => {
    return res.render("products/productCart");
  },

  detail: (req, res) => {
    return res.render("products/productDetail", {
      product: products.find((product) => product.id === +req.params.id),
      products,
    });
  },

  admin: (req, res) => {
    return res.render("users/admin", {
      title: "administracion",
      products: JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "..", "data", "products.json"),
          "utf-8"
        )
      ),
    });
  },

  //vista para añadir
  add: (req, res) => {
    db.Section.findAll()
      .then((sections) => {
        return res.render("users/add", {
          sections,
        });
      })
      .catch((error) => console.log(error));
  },

  //logica para añadir el producto
  store: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {

      const { name, description, price, section, discount } = req.body;
      db.Product.create({
        name: name.trim(),
        description: description.trim(),
        price,
        discount,
        sectionId: section,
      })
      .then(product => {
        if(req.file[0] != undefined) {
            let image = req.file.map(image => {
                let img = {
                    file : image.filename,
                    productId : product.id
                }
                return img
            })
            db.Image.bulkCreate(image, {validate : true})
                .then( () => console.log('Imagen agregada'))
        }
        return res.redirect('admin')
    })
     .catch(error=> console.log(error))

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
    return res.render("users/edit", {
      product: products.find((product) => product.id === +req.params.id),
    });
  },

  //logica para actualizar un producto
  update: (req, res) => {
    let errors = validationResult(req);
    let product = products.find((product) => product.id === +req.params.id);
    if (errors.isEmpty()) {
      const { name, description, price, discount } = req.body;

      let productModified = {
        id: +req.params.id,
        name: name.trim(),
        description: description.trim(),
        price: +price,
        discount,
        image: product.image,
      };
      let productsModified = products.map((product) =>
        product.id === +req.params.id ? productModified : product
      );

      fs.writeFileSync(
        path.join(__dirname, "..", "data", "products.json"),
        JSON.stringify(productsModified, null, 3),
        "utf-8"
      );

      return res.redirect("/product/admin");
    } else {
      return res.render("users/edit", {
        errors: errors.mapped(),
        product,
      });
    }
  },

  //borra un producto
  destroy: (req, res) => {
    let productsModified = products.filter(
      (product) => product.id !== +req.params.id
    );

    fs.writeFileSync(
      path.join(__dirname, "..", "data", "products.json"),
      JSON.stringify(productsModified, null, 3),
      "utf-8"
    );

    res.redirect("/product/admin");
  },
};
