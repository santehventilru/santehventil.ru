const Router = require('express');
const router = new Router();
const orderController = require('../controllers/ordersController');
const isAuthenticated = require('../middlewares/authmiddleware');
const isAdmin = require('..//middlewares/adminmiddleware')

// router.post('/addtocart', orderController.createCart);

// router.get('/orders', isAuthenticated, isAdmin, orderController.getAllOrders);


// router.get('/order/:id', isAuthenticated,  orderController.getOrderById);
router.put('/api/order/:id', isAuthenticated, isAdmin, orderController.updateOrderStatus);
// router.post('/order/confirm', orderController.CartToOrder);
// router.put('/api/order/:id', isAuthenticated, isAdmin, orderController.updateOrderDeliveryDate);

// router.post('/api/order/delete/:id', isAuthenticated, orderController.deleteOrder);
router.put('/api/order-services/:orderServiceId', isAdmin, isAuthenticated, orderController.updateOrderServicePrice)
router.get('/api/order-services', orderController.getAllOrderServices);



router.get('/api/orders/all', isAuthenticated, isAdmin, orderController.getAllOrders);


router.get('/api/my/orders/:profile_id', isAuthenticated, orderController.getOrdersByUser);
//cart
router.get('/api/cart', orderController.getCartByUser);
router.post('/api/addtocart', orderController.createCart);
router.post('/api/cart/updatequantity/:product_id', orderController.updateQuantityItemCart)
router.delete('/api/cart/delete/:product_id', orderController.deleteItemFromCart);
router.post('/api/order/confirm', orderController.CartToOrder);



module.exports = router;