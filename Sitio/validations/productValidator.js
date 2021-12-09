const {check} = require('express-validator')

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio').isLength({
        min : 5
    }),
        
    check('description')
    .notEmpty().withMessage('La descripcion es obligatoria').bail()
    .isLength({
        min : 20
    }).withMessage('La descripcion tiene que tener un minimo de 20 caracteres'),

    check('price')
    .isInt({
        min:1
    }).withMessage('Ingrese un numero valido'),

    check('section')
    .notEmpty().withMessage('Indicá la secciòn'),

    check('discount')
    .notEmpty().withMessage('Indicá las cuotas'),

     check('image')
    .notEmpty().withMessage('Debes añadir una imagen con formato JPG,PNG,JPEG')
]