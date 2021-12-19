var express = require('express');
var router = express.Router();
const loginValidator = require('../validations/loginValidator')
const registerValidator = require('../validations/registerValidator')
const userLoginCheck = require('../middlewares/userLoginCheck')
const notEntry = require('../middlewares/notEntry')
const upload = require('../middlewares/multerImageUser');
const perfilValidator = require('../validations/perfilValidator')

const {register,login,logout,processRegister,processLogin,profile,update} = require('../controllers/usersController');
const { single } = require('../middlewares/multerImageUser');


/* GET users listing. */
router.get('/register',notEntry,register);
router.post('/register',registerValidator,processRegister)

router.get('/login',notEntry,login);
router.post('/login',loginValidator,processLogin)

router.get('/logout',logout)

router.get('/profile',userLoginCheck,profile)
router.put('/profile',upload.single('avatar'),perfilValidator,update)

module.exports = router;
