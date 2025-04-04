const pool = require('../config/db');

class DeliveryController {
    async createDelivery(req, res) {
        try {
            const { type, price } = req.body;

            const newDelivery = await pool.query(
                'INSERT INTO Delivery (type, price) VALUES ($1, $2) RETURNING *',
                [type, price]
            );

            res.status(201).json(newDelivery.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async getAllDeliveries(req, res) {
        try {
            const deliveries = await pool.query('SELECT * FROM Delivery');
            res.json(deliveries.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async getDeliveryPrice(req, res) {
        try {
            const { code } = req.params;
            const delivery = await pool.query('SELECT price FROM Delivery WHERE code = $1', [code]);

            if (delivery.rows.length > 0) {
                res.json(delivery.rows[0]);
            } else {
                res.status(404).json({ error: 'Delivery not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async getDeliveryById(req, res) {
        try {
            const { code } = req.params;
            const delivery = await pool.query('SELECT * FROM Delivery WHERE code = $1', [code]);

            if (delivery.rows.length > 0) {
                res.json(delivery.rows[0]);
            } else {
                res.status(404).json({ error: 'Delivery not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async updateDelivery(req, res) {
        try {
            const { code } = req.params;
            const { type, price } = req.body;

            const updatedDelivery = await pool.query(
                'UPDATE Delivery SET type = $2, price = $3 WHERE code = $1 RETURNING *',
                [code, type, price]
            );

            if (updatedDelivery.rows.length > 0) {
                res.json(updatedDelivery.rows[0]);
            } else {
                res.status(404).json({ error: 'Delivery not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async deleteDelivery(req, res) {
        try {
            const { code } = req.params;

            const deletedDelivery = await pool.query(
                'DELETE FROM Delivery WHERE code = $1 RETURNING *',
                [code]
            );

            if (deletedDelivery.rows.length > 0) {
                res.json({ message: 'Delivery deleted successfully' });
            } else {
                res.status(404).json({ error: 'Delivery not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new DeliveryController();
