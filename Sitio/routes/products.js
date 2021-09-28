var express = require('express');
var router = express.Router();

const { cart, detail , admin , add, edit} = require('../controllers/productsController');

router.get('/productCart', cart );
router.get('/productDetail', detail);
router.get('/productDetail/:id', detail);
router.get('/admin',admin);
router.get('/add',add);
router.get('/edit', edit);

module.exports = router;