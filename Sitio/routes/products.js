var express = require('express');
var router = express.Router();

const { cart, detail , admin ,store, add, edit,update,destroy} = require('../controllers/productsController');




router.get('/productCart', cart );

router.get('/productDetail/:id', detail);





router.get('/admin',admin);

//añadir un producto
router.get('/add',add);
router.post('/add',store)

//editar un producto
router.get('/edit/:id', edit);
router.put('/edit/:id',update)

//borrar un producto
router.delete('/destroy/:id',destroy)


module.exports = router;