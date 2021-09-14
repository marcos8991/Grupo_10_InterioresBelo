var express = require('express');
var router = express.Router();

const { productCart, productDetail } = require('../controllers/productsController');

router.get('/productCart',productCart );
router.get('/productDetail',productDetail);

module.exports = router;