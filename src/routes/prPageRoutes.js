const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');

router.get('/products/:id', productController.getProductByIdRender);



module.exports = router;
