const {body, check} = require('express-validator');
const bcrypt = require('bcryptjs')
const db = require('../database/models');

module.exports = [
    check('name')
    .isLength({
        min : 2,
        max : 30
    }).withMessage('El nombre es obligatorio y debe tener almenos 2 caracteres'),

    check('email')
    .notEmpty().withMessage('debes ingresar un email valido').bail()
    .isEmail().withMessage('Email invalido'),

    body('email')
        .custom(value  => {
          return db.User.findOne({
              where : { 
                  email : value
                }
          }).then( user => {
              if(user){
                  return Promise.reject('El email ya se encuentra registrado')
              }
          })
        }),

    check('password')
    .isLength({
        min : 8,
        max : 15
    }).withMessage('La contraseña debe tener un minimo de 8 caracteres y un maximo de 15 caracteres'),

    body('password2')
    .custom((value,{req}) => {
        

        if (value !== req.body.password) {
            return false
        } else {
            return true
        }
    }).withMessage('La contraseña no coincide'),

]     



