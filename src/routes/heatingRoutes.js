const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const isAuthenticated = require('../middlewares/authmiddleware');
const isAdmin = require('..//middlewares/adminmiddleware')

// router.get('/product/catalog', productController.getMainProductsHeating);
// router.get('/heating', productController.getAllProducts);


module.exports = router;