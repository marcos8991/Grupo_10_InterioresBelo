var express = require('express');
var router = express.Router();

const { productCart, productDetail, admin } = require('../controllers/productsController');

router.get('/productCart',productCart );
router.get('/productDetail',productDetail);
router.get('/admin',admin);
module.exports = router;