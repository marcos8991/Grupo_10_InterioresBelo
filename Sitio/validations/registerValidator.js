const {body, check} = require('express-validator');
users = require('../data/users.json')
bcrypt = require('bcryptjs')

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio'),


    check('email')
    .notEmpty().withMessage('debes ingresar un email valido').bail()
    .isEmail().withMessage('Email invalido'),



    body('email')
    .custom((value,{req}) => {
        let user = users.find(user => user.email === value);

        if (user) {
            return false
        } else {
            return true
        }
    }).withMessage('El email ya se encuentra registrado'),

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
