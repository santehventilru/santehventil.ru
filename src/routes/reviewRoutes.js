const Router = require('express');
const router = new Router();
const reviewController = require('../controllers/reviewController');
const isAuthenticated = require('../middlewares/authmiddleware');
const isAdmin = require('..//middlewares/adminmiddleware')


// router.put('/reviews/:review_id', isAuthenticated, reviewController.updateReview);
// router.get('/reviews/user/:login',  reviewController.getReviewsByLogin);
// router.get('/reviews/product/:product_id', reviewController.getReviewsByProduct);
// router.delete('/reviews/:review_id', isAuthenticated, reviewController.deleteReview);

//api
router.get('/api/reviews/all', reviewController.getReviewsAll)
router.post('/api/reviews', isAuthenticated, reviewController.createReview);

module.exports = router;
