var express = require('express');
var router = express.Router();

const loginValidator = require('../validations/loginValidator')
const registerValidator = require('../validations/registerValidator')
const {register,login,logout,processRegister,processLogin} = require('../controllers/usersController');


/* GET users listing. */
router.get('/register',register);
router.post('/register',registerValidator,processRegister)

router.get('/login',login);
router.post('/login',loginValidator,processLogin)

router.get('/logout',logout)


module.exports = router;
