var express = require('express');


var router = express.Router();

const {register,login ,admin, add, edit} = require('../controllers/usersController');

/* GET users listing. */
router.get('/register',register);
router.get('/login',login);
router.get('/admin',admin);
router.get('/add',add);
router.get('/edit', edit);


module.exports = router;
