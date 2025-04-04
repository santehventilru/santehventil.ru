const Router = require('express');
const isAdmin = require('../middlewares/adminmiddleware');
const isAuthenticated = require('../middlewares/authmiddleware');
const router = new Router();


router.get('/shippingInformation', (req, res) => {
    res.render('shippingInformation'); 
});//инфа доставка
router.get('/cartPage', (req, res) => {
  res.render('cartPage'); 
});
router.get('/MakingAnOrder', (req, res) => {
  res.render('MakingAnOrder', { token: '91533efbe42b8bf6d5709ea08d90e2889e03962c' }); 
});
router.get('/page404', (req, res) => {
  res.render('page404'); 
});
router.get('/contats', (req, res) => {
  res.render('contats'); 
});
router.get('/loyaltyProg', (req, res) => {
  res.render('loyaltyProg'); 
});
router.get('/article', (req, res) => {
  res.render('article'); 
})
//subCatelogStaticLinkBrand
router.get('/product/santeh/brand/:category/:id', (req, res) => {
  
  res.render('subCatalog'); 
})
router.get('/product/santeh/:category', (req, res) => {
  
  res.render('subCatalog'); 
})

router.get('/admin',isAdmin ,isAuthenticated, (req, res) =>{
  res.render('admin');
})

module.exports = router;