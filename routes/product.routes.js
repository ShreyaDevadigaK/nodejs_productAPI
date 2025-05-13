const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/', auth, upload.array('images'), productCtrl.createProduct);

router.post('/:userid', auth, upload.array('images'), productCtrl.createProductByUserId);

router.get('/', auth, productCtrl.getProducts);

router.put('/:id', auth, productCtrl.updateProduct);

router.delete('/:id', auth, productCtrl.deleteProduct);

router.delete('/', auth, productCtrl.deleteAllProducts);

router.get('/published', auth, productCtrl.getPublishedProducts);

router.get('/:id', auth, productCtrl.getProductById);

router.get('/user/:userid', auth, productCtrl.getProductsByUserId);

router.post('/:userId', auth, productCtrl.addProductByUserId);

router.put('/:userid/:productid', auth, productCtrl.updateProductByUserId);

const csvUpload = multer({ dest: 'uploads/' });

router.post('/upload-csv', auth, csvUpload.single('file'), productCtrl.bulkUpload);
router.get('/download-csv', auth, productCtrl.downloadCSV);

module.exports = router;