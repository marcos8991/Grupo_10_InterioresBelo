const {check} = require('express-validator')

module.exports = [
    check('name')
    .notEmpty().withMessage('el nombre del producto es obligatorio'),

    check('description')
    .notEmpty().withMessage('la descripcion es obligatoria').bail()
    .isLength({
        min : 20
    }).withMessage('la descripcion tiene que tener un minimo de 20 caracteres'),

    check('price')
    .isInt({
        min:1
    }).withMessage('Ingrese un numero valido'),

    
]