const db = require('../database/models');
const {check, body} = require('express-validator');
const bcryptjs = require('bcryptjs');

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es requerido'),

    body('password')
        .custom( async (value,{req}) => {
            try {
                let user =await db.User.findByPk(req.session.userLogin.id)
                console.log(bcryptjs.compareSync(value, user.password));
                if(value){
                    if(bcryptjs.compareSync(value, user.password)){
                        return Promise.reject('Las contraseñas deben ser diferentes')
                    }
                }
                
            } catch(error) {
                console.log(error);
            }
    })
]