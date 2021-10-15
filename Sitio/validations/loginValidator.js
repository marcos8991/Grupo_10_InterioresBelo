const {body} = require('express-validator');
users = require('../data/users.json')
bcrypt = require('bcryptjs')

module.exports = [
    body('email')
    .custom((value,{req})=>{
        let user = users.find(user => user.email === value && bcrypt.compareSync(req.body.password,user.password));

        if (user) {
            return true
        } else {
            return false
        }
    }).withMessage('Datos Incorrectos')
]    
