var express = require('express');
var router = express.Router(); 


const { cart, detail , admin ,store, add, edit,update,destroy} = require('../controllers/productsController');

const adminUserCheck = require('../middlewares/adminUserCheck')

//multer
const upload = require('../middlewares/multerImageProduct')

//validaciones
const productValidator = require('../validations/productValidator')


router.get('/productCart',cart);

router.get('/productDetail/:id', detail);
router.get('/admin',adminUserCheck, admin);

//añadir un producto
router.get('/add',adminUserCheck,add);
router.post('/add',upload.array('image'),productValidator, store)

//editar un producto
router.get('/edit/:id',adminUserCheck,edit);
router.put('/update/:id',productValidator,update)

//borrar un producto
router.delete('/destroy/:id',destroy)


module.exports = router;