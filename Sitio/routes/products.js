var express = require('express');
var router = express.Router(); 
const path = require('path')

const { cart, detail , admin ,store, add, edit,update,destroy} = require('../controllers/productsController');


const multer = require('multer');
const { pathToFileURL } = require('url');

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'./public/images/products')
    },
    filename : (req,file,cb) => {
        cb(null,'img-product-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage
})

router.get('/productCart', cart );

router.get('/productDetail/:id', detail);

router.get('/admin',admin);

//añadir un producto
router.get('/add',add);
router.post('/add',upload.single('image'),store)

//editar un producto
router.get('/edit/:id', edit);
router.put('/edit/:id',update)

//borrar un producto
router.delete('/destroy/:id',destroy)


module.exports = router;