const db = require('../database/models');
const {check, body} = require('express-validator');

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es requerido'),

    body('password')
        .custom(value  => {
          return db.User.findOne({
              where : { 
                  password : value
                }
          }).then(user=> {
              if(user){
                  return Promise.reject('La contraseña no puede ser la misma')
              }
          }).catch(error => console.log(error))
        }),
]