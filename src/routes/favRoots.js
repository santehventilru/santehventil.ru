const Router = require('express');
const router = new Router();
const favController = require('../controllers/favControllers');

router.get('/api/fav', favController.getFavoritesByUser);
router.post('/api/favorites/toggle', favController.toggleFavorite);
// router.delete('/api/fav/delete/:product_id', favController.deleteItemFromFavorites);

module.exports = router;