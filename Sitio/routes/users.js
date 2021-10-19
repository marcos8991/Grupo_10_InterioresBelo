var express = require('express');
var router = express.Router();

const loginValidator = require('../validations/loginValidator')

const {register,login,logout,processRegister,processLogin} = require('../controllers/usersController');


/* GET users listing. */
router.get('/register',register);
router.post('/register',processRegister)

router.get('/login',login);
router.post('/login',loginValidator,processLogin)

router.get('/logout',logout)


module.exports = router;
