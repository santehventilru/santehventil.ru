const pool = require('../config/db');

class ReviewController {
    async createReview(req, res) {
        try {
            const { product_id, login, text, review_date, rating } = req.body;

            const newReview = await pool.query(
                'INSERT INTO Product_Reviews (product_id, login, text, review_date, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [product_id, login, text, review_date, rating]
            );

            res.status(201).json(newReview.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async updateReview(req, res) {
        try {
            const { review_id } = req.params;
            const { text, review_date, rating } = req.body;

            const updatedReview = await pool.query(
                'UPDATE Product_Reviews SET text = $2, review_date = $3, rating = $4 WHERE review_id = $1 RETURNING *',
                [review_id, text, review_date, rating]
            );

            if (updatedReview.rows.length > 0) {
                res.json(updatedReview.rows[0]);
            } else {
                res.status(404).json({ error: 'Review not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async getReviewsByLogin(req, res) {
        try {
            const { login } = req.params;
            const reviews = await pool.query(
                'SELECT * FROM Product_Reviews WHERE login = $1',
                [login]
            );

            res.json(reviews.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async getCompanyReviews(req, res) {
        try {
            const reviews = await pool.query(
                'SELECT first_name, last_name, company_review_text, company_review_date, company_rating FROM Profile where company_rating = 5'
            );

            res.render('index', { title: 'Ventil', reviews: reviews.rows })
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async getReviewsByProduct(req, res) {
        try {
            const { product_id } = req.params;
            const reviews = await pool.query(
                'SELECT * FROM Product_Reviews WHERE product_id = $1',
                [product_id]
            );

            res.json(reviews.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async deleteReview(req, res) {
        try {
            const { review_id } = req.params;

            const deletedReview = await pool.query(
                'DELETE FROM Product_Reviews WHERE review_id = $1 RETURNING *',
                [review_id]
            );

            if (deletedReview.rows.length > 0) {
                res.json({ message: 'Review deleted successfully' });
            } else {
                res.status(404).json({ error: 'Review not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async getReviewsAll(req, res) {
        try {
            
            const reviews = await pool.query(
                'SELECT * FROM Product_Reviews ',
               
            );

            res.json(reviews.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new ReviewController();
