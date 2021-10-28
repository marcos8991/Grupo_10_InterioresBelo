var express = require('express');
var router = express.Router();

const loginValidator = require('../validations/loginValidator')
const registerValidator = require('../validations/registerValidator')
const userLoginCheck = require('../middlewares/userLoginCheck')

const upload = require('../middlewares/multerImageUser');

const {register,login,logout,processRegister,processLogin,profile,update} = require('../controllers/usersController');


/* GET users listing. */
router.get('/register',register);
router.post('/register',registerValidator,processRegister)

router.get('/login',login);
router.post('/login',loginValidator,processLogin)

router.get('/logout',logout)

router.get('/profile',userLoginCheck,profile)
router.post('/profile',upload.single('avatar'),update)

module.exports = router;
