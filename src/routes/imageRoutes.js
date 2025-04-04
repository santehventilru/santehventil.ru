const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const multer = require('multer');
const upload = multer(); // Настройка multer для обработки файлов
const isAuthenticated = require('../middlewares/authmiddleware');
const isAdmin = require('..//middlewares/adminmiddleware')

// router.post('/brand/image', isAdmin, isAuthenticated, upload.single('image_data'), imageController.uploadBrandImage);
// router.get('/brand/image/:brand_id', imageController.getBrandImage);
// router.delete('/brand/image/:brand_id', isAdmin, isAuthenticated, imageController.deleteBrandImage);

// router.post('/product/image', isAdmin, isAuthenticated, upload.single('image_data'), imageController.uploadProductImage);
// router.get('/product/image/:product_id', imageController.getProductImage);
// router.delete('/product/image/:product_id', isAdmin, isAuthenticated, imageController.deleteProductImage);

module.exports = router;
