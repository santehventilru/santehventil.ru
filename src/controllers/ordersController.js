const pool = require('../config/db');

class OrderController {

    async createCart(req, res) {
        try {
            const { delivery_type, products } = req.body;
    
            if (!req.session.cart) {
                req.session.cart = { products: [], totalPrice: 0 };
            }
    
            let totalPrice = req.session.cart.totalPrice;
    
            for (const product of products) {
                const { product_id, quantity } = product;
    
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
                    SELECT p.price, p.name, i.filename, 
                        (SELECT STRING_AGG(category_name, '/' ORDER BY level DESC) FROM category_path) AS productPath
                    FROM Product p 
                    JOIN product_images i ON p.product_id = i.product_id 
                    WHERE p.product_id = $1 AND i.image_type = 'main_image'`,
                    [product_id]
                );
    
                if (productData.rows.length === 0) {
                    return res.status(404).json({ message: `Product with ID ${product_id} not found` });
                }
    
                const productPrice = productData.rows[0].price;
                const productImage = productData.rows[0].filename;
                const productName = productData.rows[0].name;
                const productpath = productData.rows[0].productpath; // Убедитесь, что поле называется `productpath`
    
                let existingProduct = req.session.cart.products.find(p => p.product_id === product_id);
    
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                } else {
                    req.session.cart.products.push({
                        product_id,
                        productName,
                        productImage,
                        productpath, // Теперь передаётся корректно
                        quantity,
                        productPrice
                    });
                }
    
                totalPrice += productPrice * quantity;
            }
    
            req.session.cart.totalPrice = totalPrice;
            req.session.cart.delivery_type = delivery_type;
    
            res.status(200).json({ message: 'Товары добавлены в корзину', cart: req.session.cart });
    
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        }
    }
    

    async CartToOrder(req, res) {
        try {
            const profile_id = req.session.userId;
            if (!profile_id) {
                return res.status(401).json({ success:true,message: 'Ошибка авторизации пользователя' });
            }
    
            if (!req.session.cart || req.session.cart.products.length === 0) {
                return res.status(400).json({ success:true, message: 'Корзина пуста' });
            }
    
            const sessionCart = req.session.cart;
            const totalPrice = sessionCart.totalPrice;
            const { delivery_type,status , delivery_address, phone, payment } = req.body;
            
            const newOrder = await pool.query(
                `INSERT INTO Orders (profile_id, order_date, delivery_type, status, total_price, delivery_address, phone, payment)
                 VALUES ($1, now(), $2, $3, $4, $5, $6, $7)
                 RETURNING order_id`, // Используем правильный порядок и заменяем $З на $3
                [profile_id, delivery_type, status, totalPrice, delivery_address, phone, payment] // Передаем правильные данные
            );
            
            const orderId = newOrder.rows[0].order_id;
    
            for (const product of sessionCart.products) {
                await pool.query(
                    `INSERT INTO Order_Composition (order_id, product_id, quantity)
                     VALUES ($1, $2, $3)`,
                    [orderId, product.product_id, product.quantity]
                );
            }
    
            delete req.session.cart;
            res.status(201).json({success:true, message: 'Order created successfully from session cart' });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        }
    }
    

    async getCartByUser(req, res) {
        try {
            const sessionCart = req.session.cart;

            if (!sessionCart || sessionCart.products.length === 0) {
                return res.status(200).json({
                    message: 'Корзина пуста',
                    totalPrice: 0,
                    products: []
                });
            }

            return res.status(200).json({
                message: 'Корзина из сессии',
                totalPrice: sessionCart.totalPrice,
                products: sessionCart.products
            });
    
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
    
    async deleteItemFromCart(req, res) {
        try {
            const productId = req.params.product_id; 
            if (!req.session.cart || req.session.cart.products.length === 0) {
                return res.status(404).json({ message: 'Корзина пуста или не существует' });
            }

            const productIndex = req.session.cart.products.findIndex(product => product.product_id == productId);

            if (productIndex === -1) {
                return res.status(404).json({ message: `Товар с ID ${productId} не найден в корзине` });
            }

            const removedProduct = req.session.cart.products.splice(productIndex, 1);

            req.session.cart.totalPrice -= removedProduct[0].productPrice * removedProduct[0].quantity;
    
            res.status(200).json({ message: 'Товар успешно удалён', cart: req.session.cart });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async updateQuantityItemCart(req, res) {
        try {
            const productId = req.params.product_id;
            const newQuantity = parseInt(req.body.quantity); 
            if (!req.session.cart || req.session.cart.products.length === 0) {
                return res.status(404).json({ message: 'Корзина пуста или не существует' });
            }

            const productIndex = req.session.cart.products.findIndex(product => product.product_id == productId);
    
            if (productIndex === -1) {
                return res.status(404).json({ message: `Товар с ID ${productId} не найден в корзине` });
            }

            const product = req.session.cart.products[productIndex];

            if (newQuantity <= 0) {
                return res.status(400).json({ message: 'Количество товара должно быть больше нуля' });
            }

            req.session.cart.totalPrice -= product.productPrice * product.quantity;

            product.quantity = newQuantity;

            req.session.cart.totalPrice += product.productPrice * newQuantity;
    
            res.status(200).json({ message: 'Количество товара обновлено', cart: req.session.cart });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async getAllOrders(req, res) {
        try {
            const { payment_status, status } = req.query;
    
            let filterConditions = [];
            let queryParams = [];
    
            if (payment_status !== undefined) {
                filterConditions.push(`payment_status = $${queryParams.length + 1}`);
                queryParams.push(payment_status);
            }
    
            if (status) {
                const statusArray = status.split(',');
                const statusPlaceholders = statusArray.map((_, i) => `$${queryParams.length + i + 1}`).join(',');
                filterConditions.push(`status IN (${statusPlaceholders})`);
                queryParams.push(...statusArray);
            }
    
            const query = `
                SELECT * FROM Orders
                ${filterConditions.length > 0 ? `WHERE ${filterConditions.join(' AND ')}` : ''}
            `;
    
            const allOrders1 = await pool.query(query, queryParams);
    
            const allOrders = await Promise.all(allOrders1.rows.map(async (order) => {
                const orderItems = await pool.query(
                    `SELECT oc.product_id, oc.quantity
                     FROM order_composition oc
                     WHERE oc.order_id = $1`,
                    [order.order_id]
                );
    
                const itemsWithDetails = await Promise.all(orderItems.rows.map(async (item) => {
                    const productDetails = await pool.query(
                        `SELECT p.price, p.name, i.filename,
                        (
                        WITH RECURSIVE category_path AS (
                            SELECT id, parent_id, category_name, 1 AS level FROM categories WHERE id = p.category
                            UNION ALL
                            SELECT c.id, c.parent_id, c.category_name, cp.level + 1 
                            FROM categories c
                            INNER JOIN category_path cp ON cp.parent_id = c.id
                        ) 
                        SELECT STRING_AGG(category_name, '/' ORDER BY level DESC) FROM category_path
                    ) AS productPath 
                         FROM Product p 
                         JOIN product_images i ON p.product_id = i.product_id 
                         WHERE p.product_id = $1 AND i.image_type = 'main_image'`,
                        [item.product_id]
                    );
    
                    return {
                        product_id: item.product_id,
                        quantity: item.quantity,
                        ...productDetails.rows[0]
                    };
                }));
    
                return {
                    ...order,
                    items: itemsWithDetails
                };
            }));
    
            res.json(allOrders);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        }
    }

    async getOrdersByUser(req, res) {
        try {
            const { profile_id } = req.params;
    
            const userOrders = await pool.query(
                `SELECT * FROM Orders WHERE profile_id = $1`,
                [profile_id]
            );
    
            const ordersWithDetails = await Promise.all(userOrders.rows.map(async (order) => {
                const orderItems = await pool.query(
                    `SELECT oc.product_id, oc.quantity
                     FROM order_composition oc
                     WHERE oc.order_id = $1`,
                    [order.order_id]
                );
    
                const itemsWithDetails = await Promise.all(orderItems.rows.map(async (item) => {
                    const productDetails = await pool.query(
                        `SELECT p.price, p.name, i.filename,
                        (
                        WITH RECURSIVE category_path AS (
                            SELECT id, parent_id, category_name, 1 AS level FROM categories WHERE id = p.category
                            UNION ALL
                            SELECT c.id, c.parent_id, c.category_name, cp.level + 1 
                            FROM categories c
                            INNER JOIN category_path cp ON cp.parent_id = c.id
                        ) 
                        SELECT STRING_AGG(category_name, '/' ORDER BY level DESC) FROM category_path
                    ) AS productPath
                         FROM Product p 
                         JOIN product_images i ON p.product_id = i.product_id 
                         WHERE p.product_id = $1 AND i.image_type = 'main_image'`,
                        [item.product_id]
                    );
    
                    return {
                        product_id: item.product_id,
                        quantity: item.quantity,
                        ...productDetails.rows[0]
                    };
                }));
    
                return {
                    ...order,
                    items: itemsWithDetails
                };
            }));
            
            res.json(ordersWithDetails);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        }
    }

    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const order = await pool.query(
                `SELECT * FROM Orders WHERE order_id = $1`,
                [id]
            );

            if (order.rows.length === 0) {
                return res.status(404).json({ message: 'Order not found' });
            }

            const orderComposition = await pool.query(
                `SELECT * FROM Order_Composition WHERE order_id = $1`,
                [id]
            );

            res.json({
                order: order.rows[0],
                products: orderComposition.rows
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params;
            const { status, delivery_time, delivery_price } = req.body;
    
            const updatedOrder = await pool.query(
                `UPDATE Orders 
                 SET status = $1, delivery_time = $2, delivery_price = $3 
                 WHERE order_id = $4 
                 RETURNING *`,
                [status, delivery_time, delivery_price, id]
            );
    
            if (updatedOrder.rows.length === 0) {
                return res.status(404).json({ message: 'Order not found' });
            }
    
            res.json({ message: 'Order updated successfully', order: updatedOrder.rows[0] });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        }
    }

    async updateOrderDeliveryDate(req, res) {
        try {
            const { id } = req.params;
            const { delivery_time } = req.body;

            const updatedOrder = await pool.query(
                `UPDATE Orders SET delivery_time = $1 WHERE order_id = $2 RETURNING *`,
                [delivery_time, id]
            );

            if (updatedOrder.rows.length === 0) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.json({ message: 'Order delivery time updated', order: updatedOrder.rows[0] });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        }
    }

    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            await pool.query(
                `DELETE FROM Order_Composition WHERE order_id = $1`,
                [id]
            );
            const deleteOrder = await pool.query(
                `DELETE FROM Orders WHERE order_id = $1 RETURNING *`,
                [id]
            );
            if (deleteOrder.rows.length === 0) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json({ message: 'Order deleted successfully' });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        }
    }
    async updateOrderServicePrice(req, res) {
        try {
            const { orderServiceId } = req.params;
            const { price } = req.body;

            const updatedService = await pool.query(
                `UPDATE order_services 
                SET price = $1 
                WHERE order_service_id = $2 
                RETURNING *`,
                [price, orderServiceId]
            );

            if (updatedService.rows.length === 0) {
                return res.status(404).json({ message: "Order service not found" });
            }

            res.json({ message: "Order service price updated", service: updatedService.rows[0] });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Server error" });
        }
    }
    
    async getAllOrderServices(req, res) {
        try {
            const allOrderServices = await pool.query(
                `SELECT os.order_service_id, os.price, 
                        s.service_id, s.name AS service_name, s.description, 
                        o.order_id, o.customer_id, o.status
                FROM order_services os
                JOIN services s ON os.service_id = s.service_id
                JOIN Orders o ON os.order_id = o.order_id
                ORDER BY o.order_id DESC`
            );

            res.json(allOrderServices.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Server error" });
        }
    }
}

module.exports = new OrderController();
