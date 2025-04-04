const Router = require('express');
const router = new Router();
const deliveryController = require('../controllers/deliveryController');
const isAuthenticated = require('../middlewares/authmiddleware');
const isAdmin = require('..//middlewares/adminmiddleware')

router.post('/delivery', isAdmin, isAuthenticated, deliveryController.createDelivery);
router.get('/delivery', deliveryController.getAllDeliveries);
router.get('/delivery/:code', deliveryController.getDeliveryPrice);
router.get('/delivery/id/:code', deliveryController.getDeliveryById);
router.put('/delivery/:code', isAdmin, isAuthenticated, deliveryController.updateDelivery);
router.delete('/delivery/:code', isAdmin, isAuthenticated, deliveryController.deleteDelivery);

module.exports = router;