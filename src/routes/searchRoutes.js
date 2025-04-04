const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController')

//получени популярных или каких либо там еще товаров не больше 20 или  16 ну или просто лучших товаров снатехники
//на вход ничего
// router.get('/api/bestsantex', productController.bestSantex)

//полчение лучших выгодных товаров можно по средней цене ну или как угодно там тоже 20 или 16 ну или просто лучших товаров отопления 
//на вход ничего
// router.get('/api/besthaeting', productController.bestHeating)

//полчуние товарв по посиковому запросу 
//так же вывод брендов по найденым товарам
//если на вход поступает пустой запрос , вместо строки  - вывести все бренды
//поиск должен работать как по sku так и по названию
// router.get('api/search/:product', productController.searchProducts)
//router.get('/api/search/:item', productController.getSearchProduct)


module.exports = router;