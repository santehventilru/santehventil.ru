const pool = require('../config/db');

class ImageController {
    async uploadBrandImage(req, res) {
        try {
            const { brand_id } = req.body;
            const image_data = req.file.buffer; // Должен быть доступен через multer
            const filename = req.file.originalname;

            const newImage = await pool.query(
                'INSERT INTO brand_images (brand_id, image_data, filename) VALUES ($1, $2, $3) RETURNING *',
                [brand_id, image_data, filename]
            );

            res.status(201).json(newImage.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async uploadProductImage(req, res) {
        try {
            const { product_id } = req.body;
            const image_data = req.file.buffer; // Должен быть доступен через multer
            const filename = req.file.originalname;

            const newImage = await pool.query(
                'INSERT INTO product_images (product_id, image_data, filename) VALUES ($1, $2, $3) RETURNING *',
                [product_id, image_data, filename]
            );

            res.status(201).json(newImage.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getBrandImage(req, res) {
        
    }

    async getProductImage(req, res) {
        try {
            const { product_id } = req.params;

            const image = await pool.query(
                'SELECT  filename FROM product_images WHERE product_id = $1',
                [product_id]
            );

            if (image.rows.length > 0) {
                res.json(image.rows)
                console.log(image.rows)
            } else {
                res.status(404).json({ error: 'Product image not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteBrandImage(req, res) {
        try {
            const { brand_id } = req.params;

            const deletedImage = await pool.query(
                'DELETE FROM brand_images WHERE brand_id = $1 RETURNING *',
                [brand_id]
            );

            if (deletedImage.rows.length > 0) {
                res.json({ message: 'Brand image deleted successfully' });
            } else {
                res.status(404).json({ error: 'Brand image not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteProductImage(req, res) {
        try {
            const { product_id } = req.params;

            const deletedImage = await pool.query(
                'DELETE FROM product_images WHERE product_id = $1 RETURNING *',
                [product_id]
            );

            if (deletedImage.rows.length > 0) {
                res.json({ message: 'Product image deleted successfully' });
            } else {
                res.status(404).json({ error: 'Product image not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new ImageController();
