const {check} = require('express-validator')

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio').isLength({
        min : 5
    }).withMessage('Se requiere un minimo de 5 caracteres'),
        
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

    check('category')
    .notEmpty().withMessage('Selecciona una categoria')

  
]