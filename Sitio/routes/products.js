var express = require('express');
var router = express.Router();

const { cart, detail } = require('../controllers/productsController');

router.get('/productCart', cart );
router.get('/productDetail', detail);

module.exports = router;