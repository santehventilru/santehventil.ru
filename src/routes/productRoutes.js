const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const isAuthenticated = require('../middlewares/authmiddleware');
const isAdmin = require('..//middlewares/adminmiddleware')

// router.post('/product/santeh/towelwarm', isAdmin, isAuthenticated, productController.createTowelWarmer);
// router.post('/product/santeh/toilet', isAdmin, isAuthenticated,  productController.createToilet);
// router.post('/product/santeh/urinal', isAdmin, isAuthenticated,  productController.createUrinal);
// router.put('/product/santeh/towelwarm', isAdmin, isAuthenticated,  productController.updateTowelWarmer);
// router.put('/product/santeh/toilet', isAdmin, isAuthenticated,  productController.updateToilet);
// router.put('/product/santeh/urinal', isAdmin, isAuthenticated,  productController.updateUrinal);
// router.get('/', productController.getMainProducts);


// // router.get('/product/santeh/name/:name', productController.getProductByName);
// // router.get('/product/santeh/sku/:sku', productController.getProductBySku);
// router.delete('/product/santeh/:id', isAdmin, isAuthenticated,  productController.deleteProduct);

/* json */

// router.get('/santeh/id/:id', productController.getProductByIdJson)

//api - to front react
router.get(`/api/products/hits`, productController.getHistProducts)//hits;
router.get(`/api/products/sale`, productController.getSaleProducts)
router.get('/api/subCategories/:categoryId' , productController.getSubCaategory)
router.get('/api/categoriesInfo', productController.getCategoryInfo)
router.get('/api/attribute/:categotyId', productController.getAttribute)
router.get('/api/products/catalog', productController.productByCatalog)
router.get('/api/products/id/:id', productController.getProductById);

//------------------------------------------------------------------------------------------------

//для филтра




//брнеды 
router.get('/api/brand/subCategories/:brandId' , productController.getSubCategoryByBrand)
router.get('/api/brand/:brand_name/categories', productController.getProductSubCategoryByBrandID);
router.get('/api/brand/attribute/:brandId', productController.getBrandAttribute)




// router.get('/product/filter/hits', productController.getFilterHits)
router.get('/api/search/:item', productController.getSearchProduct)

//sbCatergory


// router.get('/attribute/:categotyId', productController.getAttribute)
// router.get('/categories/:categoryId/path', productController.getSubCaategoryPath)
// router.get('/product/MinMaxPrice', productController.getMinMAxPrice)

module.exports = router;