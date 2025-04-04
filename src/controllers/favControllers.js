const pool = require('../config/db');

class favController {

    async getFavoritesByUser(req, res) {
        try {
            const sessionFavorites = req.session.favorites;
    
            if (!sessionFavorites || sessionFavorites.products.length === 0) {
                return res.status(200).json({
                    message: 'Избранные товары пусты',
                    products: []
                });
            }
    
            return res.status(200).json({
                message: 'Избранные товары из сессии',
                products: sessionFavorites.products
            });
    
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async toggleFavorite(req, res) {
        try {
            const { product_id } = req.body;
    
            if (!req.session.favorites) {
                req.session.favorites = { products: [] };
            }
    
            const productIndex = req.session.favorites.products.findIndex(p => p.product_id === product_id);
    
            if (productIndex !== -1) {
                req.session.favorites.products.splice(productIndex, 1);
                return res.status(200).json({ message: 'Товар удалён из избранного', favorites: req.session.favorites });
            }
    
            const productData = await pool.query(
                `WITH RECURSIVE category_path AS (
                    SELECT id, parent_id, category_name, 1 AS level 
                    FROM categories 
                    WHERE id = (SELECT category FROM Product WHERE product_id = $1)
    
                    UNION ALL
    
                    SELECT c.id, c.parent_id, c.category_name, cp.level + 1 
                    FROM categories c
                    INNER JOIN category_path cp ON cp.parent_id = c.id
                ) 
                SELECT 
                    p.price, 
                    p.name, 
                    i.filename AS productImage, 
                    (SELECT STRING_AGG(category_name, '/' ORDER BY level DESC) FROM category_path) AS productPath
                FROM Product p 
                JOIN product_images i ON p.product_id = i.product_id 
                WHERE p.product_id = $1 AND i.image_type = 'main_image'`,
                [product_id]
            );
    
            if (productData.rows.length === 0) {
                return res.status(404).json({ message: `Product with ID ${product_id} not found` });
            }
    
            const { price: productPrice, name: productName, productimage: productImage, productpath: productpath } = productData.rows[0];
    
            req.session.favorites.products.push({
                product_id,
                productName,
                productImage,
                productPrice,
                productpath // Теперь добавляется путь к категории
            });
    
            res.status(200).json({ message: 'Товар добавлен в избранное', favorites: req.session.favorites });
    
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
    
    
    
    


}

module.exports = new favController();