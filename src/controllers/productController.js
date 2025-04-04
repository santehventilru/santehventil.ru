const pool = require('../config/db');

class ProductController {

    async getHistProducts(req, res) {
        try {
            const producthits = await pool.query(`
                SELECT 
                    p.product_id,
                    p.price,
                    p.disc,
                    p.name,
                    p.sku,
                    pi.filename AS main_image,
                    ROUND(p.price - (p.price * (p.disc / 100)), 0) AS final_price,
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
                FROM product p
                LEFT JOIN product_images pi ON p.product_id = pi.product_id 
                WHERE p.product_id IN (
                    SELECT product_id FROM order_composition 
                    GROUP BY product_id ORDER BY SUM(quantity) DESC LIMIT 10
                ) 
                AND pi.image_type = 'main_image'
            `);
            res.json(producthits.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async getSaleProducts(req, res) {
        try {
            const productsale = await pool.query(`
                SELECT 
                    p.product_id,
                    p.price,
                    p.disc,
                    p.name,
                    p.sku,
                    pi.filename AS main_image,
                    ROUND(p.price - (p.price * (p.disc / 100)), 0) AS final_price,
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
                FROM product p
                LEFT JOIN product_images pi ON p.product_id = pi.product_id
                WHERE p.disc != 0 AND pi.image_type = 'main_image'
                ORDER BY p.disc DESC 
                LIMIT 8
            `);
            res.json(productsale.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async getMainProducts(req, res) {
        try {
            const productshits = await pool.query(`
                SELECT 
                    p.product_id,
                    p.price,
                    p.disc AS sale,
                    p.name,
                    p.sku,
                    pi.filename AS main_image,
                    ROUND(p.price - (p.price * (p.disc / 100)), 0) AS final_price,
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
                FROM product p
                LEFT JOIN product_images pi ON p.product_id = pi.product_id 
                WHERE p.product_id IN (
                    SELECT product_id FROM order_composition 
                    GROUP BY product_id ORDER BY SUM(quantity) DESC LIMIT 10
                ) 
                AND pi.image_type = 'main_image'
            `);
    
            const products = await pool.query(`
                SELECT 
                    p.product_id AS id,
                    p.price,
                    p.disc AS sale,
                    p.name,
                    p.sku,
                    pi.filename AS main_image,
                    ROUND(p.price - (p.price * (p.disc / 100)), 0) AS final_price,
                    (
                        WITH RECURSIVE category_path AS (
                            SELECT id, parent_id, category_name FROM categories WHERE id = p.category
                            UNION ALL
                            SELECT c.id, c.parent_id, c.category_name FROM categories c
                            INNER JOIN category_path cp ON cp.parent_id = c.id
                        ) SELECT STRING_AGG(category_name, '/') FROM category_path
                    ) AS productPath
                FROM product p
                LEFT JOIN product_images pi ON p.product_id = pi.product_id
                WHERE p.disc != 0 AND pi.image_type = 'main_image'
                ORDER BY sale DESC LIMIT 8
            `);
    
            res.render('index', { title: 'Ventil', products: products.rows, productshits: productshits.rows });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    

    async getFilterOptions(req, res) {
        
        try {
                // Подкатегории для категории "Инженерная сантехника" (parent_id = 0)
            const subcategories = await pool.query(`
                SELECT id, category_name
                FROM categories
                WHERE id = 1;
            `);

            // Атрибуты товаров
            const attributes = await pool.query(`
                SELECT 
                    a.attribute_id, 
                    a.attribute_name, 
                    pa.value 
                FROM product_attributes pa
                LEFT JOIN attributes a ON pa.attribute_id = a.attribute_id;
            `);
    
            
    
            res.json({
                subcategories: subcategories.rows,
                attributes: attributes.rows
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            // Запрос для конкретного товара
            const product = await pool.query(`
                SELECT 
                    p.*, 
                    p.product_id AS id,
                    pi.filename AS main_image,
                    p.price - (p.price * (p.disc / 100)) AS final_price
                FROM product p
                LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.image_type = 'main_image'
                WHERE p.product_id = $1;
            `, [id]);
    
            // Запрос дополнительных изображений товара
            const productImages = await pool.query(`
                SELECT 
                    pi.filename AS add_image
                FROM product_images pi
                WHERE product_id = $1 AND NOT image_type = 'main_image';
            `, [id]);
    
            // Запрос цепочки категорий
            const categoriesQuery = await pool.query(`
                WITH RECURSIVE category_path AS (
                    SELECT 
                        id, 
                        parent_id, 
                        category_name
                    FROM categories с
                    LEFT JOIN product p ON p.category = с.id
                    WHERE p.product_id = $1
                    UNION ALL
                    SELECT 
                        c.id, 
                        c.parent_id, 
                        c.category_name
                    FROM categories c
                    INNER JOIN category_path cp ON cp.parent_id = c.id
                )
                SELECT * FROM category_path;
            `, [id]);
    
            // Запрос цепочки категорий
            const attributesQuery = await pool.query(`
                select attribute_name, value from product_attributes pa left join attributes a on pa.attribute_id=a.attribute_id where pa.product_id=$1
            `, [id]);
    
            if (product.rows.length > 0) {
                res.json({ 
                    title: 'Product', 
                    product: product.rows[0],
                    productImages: productImages.rows,
                    categories: categoriesQuery.rows.reverse(),
                    attributes: attributesQuery.rows,
                });
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;

            const deletedProduct = await pool.query('DELETE FROM product WHERE product_id = $1 RETURNING *', [id]);

            if (deletedProduct.rows.length > 0) {
                res.json({ message: 'Product deleted successfully' });
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
    async getProductSubCategoryByBrandID(req, res) {
        
        const { brand_name } = req.params;
        const { categoryPath, limit, offset, filters } = req.query;
    
        try {
            // Декодируем и разбираем categoryPath
            const decodedCategoryPath = decodeURIComponent(categoryPath);
            const pathSegments = decodedCategoryPath.split('/');
            const ids = pathSegments.map(segment => parseInt(segment.split('-')[0], 10));
            const lastCategoryId = ids[ids.length - 1]; // Берем последнюю категорию из пути
    
            // Получаем brand_id по brand_name
            const brandQuery = `SELECT brand_id FROM brand WHERE LOWER(name) = LOWER($1) LIMIT 1;`;
            const brandResult = await pool.query(brandQuery, [brand_name]);
    
            if (brandResult.rows.length === 0) {
                return res.status(404).json({ error: 'Бренд не найден' });
            }
    
            const brand_id = brandResult.rows[0].brand_id;
    
            // Обрабатываем фильтры
            let filterConditions = [`p.brand_id = $1`];
    
            if (categoryPath) {
                filterConditions.push(`p.category IN (
                    WITH RECURSIVE category_tree AS (
                        SELECT id FROM categories WHERE id = $2
                        UNION ALL
                        SELECT c.id FROM categories c
                        INNER JOIN category_tree ct ON c.parent_id = ct.id
                    )
                    SELECT id FROM category_tree
                )`);
            }
    
            if (filters) {
                const parsedFilters = JSON.parse(filters);
    
                // Фильтр по цене
                const priceFilterObj = parsedFilters.find(f => f.attribute === "price");
                if (priceFilterObj) {
                    const [minPrice, maxPrice] = priceFilterObj.values;
                    filterConditions.push(`p.price - (p.price * p.disc / 100) BETWEEN ${minPrice} AND ${maxPrice}`);
                }
    
                // Фильтр по другим атрибутам
                parsedFilters
                    .filter(f => f.attribute !== "price")
                    .forEach(({ attribute, values }) => {
                        filterConditions.push(`
                            EXISTS (
                                SELECT 1 FROM product_attributes pa
                                JOIN attributes a ON pa.attribute_id = a.attribute_id
                                WHERE pa.product_id = p.product_id
                                AND a.attribute_name = '${attribute}'
                                AND pa.value IN (${values.map(value => `'${value}'`).join(', ')})
                            )
                        `);
                    });
            }
    
            // Основной SQL-запрос
            const query = `
                SELECT 
                    p.product_id, 
                    p.sku,
                    p.name, 
                    p.price,
                    p.disc,
                    p.price - (p.price * p.disc / 100) AS final_price,
                    pi.filename AS main_image,
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
                FROM product p
                LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.image_type = 'main_image'
                WHERE ${filterConditions.join(' AND ')}
                LIMIT $${categoryPath ? 3 : 2} OFFSET $${categoryPath ? 4 : 3};
            `;
    
            const queryParams = categoryPath ? [brand_id, lastCategoryId, limit, offset] : [brand_id, limit, offset];
    
            const prod = await pool.query(query, queryParams);
            res.status(200).json(prod.rows);
        } catch (error) {
            console.error('Ошибка:', error);
            res.status(500).send('Ошибка сервера');
        }
    }
    
    

    async productByCatalog(req, res) {
        
        const { categoryPath, limit, offset, filters } = req.query;
        const decodedCategoryPath = decodeURIComponent(categoryPath);
        const pathSegments = decodedCategoryPath.split('/');
    
        const ids = pathSegments.map(segment => parseInt(segment.split('-')[0], 10));
    
        try {
            const lastCategoryId = ids[ids.length - 1];
    
            // Обработка фильтров, если они переданы
            let attributeFilters = '';
            let priceFilter = '';
    
            if (filters) {
                const parsedFilters = JSON.parse(filters);
    
                // Обработка диапазона цен
                const priceFilterObj = parsedFilters.find(f => f.attribute === "price");
                if (priceFilterObj) {
                    const [minPrice, maxPrice] = priceFilterObj.values;
                    priceFilter = `p.price - (p.price * p.disc / 100) BETWEEN ${minPrice} AND ${maxPrice}`;
                }
    
                // Обработка других атрибутов
                attributeFilters = parsedFilters
                    .filter(f => f.attribute !== "price")
                    .map(({ attribute, values }) => `
                        p.product_id IN (
                            SELECT pa.product_id
                            FROM product_attributes pa
                            WHERE pa.attribute_id = (
                                SELECT attribute_id FROM attributes WHERE attribute_name = '${attribute}'
                            )
                            AND pa.value IN (${values.map(value => `'${value}'`).join(', ')})
                        )
                    `)
                    .join(' AND ');
            }
    
            // Формирование полного условия фильтрации
            const filterConditions = [
                priceFilter,
                attributeFilters
            ].filter(Boolean).join(' AND ');
    
            const query = `
                WITH RECURSIVE category_tree AS (
                    SELECT id, parent_id, category_name
                    FROM categories
                    WHERE id = $1
    
                    UNION ALL
    
                    SELECT c.id, c.parent_id, c.category_name
                    FROM categories c
                    INNER JOIN category_tree ct ON c.parent_id = ct.id
                )
                SELECT 
                    p.product_id, 
                    p.sku,
                    p.name, 
                    p.price,
                    p.disc,
                    p.price - (p.price * p.disc / 100) AS final_price,
                    pi.filename AS main_image,
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
                FROM product p
                LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.image_type = 'main_image'
                WHERE p.category IN (
                    SELECT id FROM category_tree 
                    UNION
                    SELECT $1 
                )
                ${filterConditions ? `AND ${filterConditions}` : ''}
                LIMIT $2 OFFSET $3;
            `;
    
            const prod = await pool.query(query, [lastCategoryId, limit, offset]);
            console.log(prod)
            res.status(200).json(prod.rows);
            
        } catch (error) {
            console.error('Ошибка:', error);
            res.status(500).send('Ошибка сервера');
        }
    }
    
    async getCategoryInfo(req, res) {
        
        const categoryPath = req.query.categoryPath; 
        console.log(categoryPath)
        const pathSegments = categoryPath.split('/');
        console.log(pathSegments)

        const ids = pathSegments.map(segment => parseInt(segment.split('-')[0], 10));
        console.log(ids)
       
        try {
            const lastCategoryId = ids[ids.length - 1];
            
            const result = await pool.query(`
                WITH RECURSIVE category_tree AS (
                        SELECT id, parent_id, category_name
                        FROM categories
                        WHERE id = $1 -- Текущая категория, включая конечные подкатегории

                        UNION ALL

                        SELECT c.id, c.parent_id, c.category_name
                        FROM categories c
                        INNER JOIN category_tree ct ON c.parent_id = ct.id
                    )
                    select 
                    COUNT(*) as count_prod, 
                 
					MIN(p.price - (p.price * p.disc / 100)) AS min_price, MAX(p.price - (p.price * p.disc / 100)) AS max_price 
                    from product p
                    WHERE p.category IN (
                        SELECT id FROM category_tree -- Все вложенные категории
                        UNION
                        SELECT $1 -- И текущая категория
                    )
                
            `,[lastCategoryId]);


            const CategoryName = await pool.query(`
                select category_name from categories where id  = $1
                
            `,[lastCategoryId])
            
            res.status(200).json({result : result.rows ,CategoryName: CategoryName.rows}); // Возвращаем только число
        } catch (error) {
            console.error('Ошибка:', error);
            res.status(500).send('Ошибка сервера');
        }
    }

    async getFilterHits(req, res){
        try {
            const productshits = await pool.query(`
                select p.product_id,
                    p.price,
                    p.disc AS sale,
                    p.name,
                    p.sku,
                    pi.filename as main_image,
					round(p.price - (p.price * (p.disc / 100)), 0)  AS final_price,
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
                FROM product p
                left join product_images pi on p.product_id = pi.product_id 
				where p.product_id in (select product_id from order_composition group by product_id order by sum(quantity) desc 
                limit 10) and pi.image_type = 'main_image'
            `);
            res.status(200).json(productshits.rows)
        } catch (error) {
            console.error('Ошибка:', error);
            res.status(500).send('Ошибка сервера');
        }
    }
    
    async getSearchProduct(req, res) { 
        const reqItem = req.params.item; // Извлекаем параметр из req.params 
        const { limit, offset, filters } = req.query; 
     
        // Преобразуем limit и offset в числа 
        const parsedLimit = parseInt(limit, 10) || 16; // Значение по умолчанию - 16 
        const parsedOffset = parseInt(offset, 10) || 0; // Значение по умолчанию - 0 
     
        // Формируем параметры поиска 
        const values = [`%${reqItem}%`, `%${reqItem}%`]; 
     
        try { 
            let filterConditions = []; 
     
            if (filters) { 
                const parsedFilters = JSON.parse(filters); 
     
                // Фильтр по цене 
                const priceFilterObj = parsedFilters.find(f => f.attribute === "price"); 
                if (priceFilterObj) { 
                    const [minPrice, maxPrice] = priceFilterObj.values; 
                    filterConditions.push(`p.price - (p.price * p.disc / 100) BETWEEN ${minPrice} AND ${maxPrice}`); 
                } 
     
                // Фильтр по другим атрибутам 
                parsedFilters 
                    .filter(f => f.attribute !== "price") 
                    .forEach(({ attribute, values }) => { 
                        filterConditions.push(` 
                            EXISTS ( 
                                SELECT 1 FROM product_attributes pa 
                                JOIN attributes a ON pa.attribute_id = a.attribute_id 
                                WHERE pa.product_id = p.product_id 
                                AND a.attribute_name = '${attribute}' 
                                AND pa.value IN (${values.map(value => `'${value}'`).join(', ')}) 
                            ) 
                        `); 
                    }); 
            } 
     
            // Основной SQL-запрос 
            const query = ` 
                SELECT  
                    p.product_id,  
                    p.sku, 
                    p.name,  
                    p.price, 
                    p.disc, 
                    p.price - (p.price * p.disc / 100) AS final_price, 
                    pi.filename AS main_image,
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
                FROM product p 
                LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.image_type = 'main_image' 
                WHERE p.name ILIKE $1 OR p.sku ILIKE $2 
                ${filterConditions.length ? `AND ${filterConditions.join(' AND ')}` : ''} 
                LIMIT $3 OFFSET $4; 
            `; 
     
            const prod = await pool.query(query, [...values, parsedLimit, parsedOffset]); 
     
            res.status(200).json(prod.rows); 
        } catch (error) { 
            console.error('Ошибка:', error); 
            res.status(500).send('Ошибка сервера'); 
        } 
    }


      async getSubCaategory(req, res){
        const {categoryId} = req.params
        
        try {
            const sbCat  = await pool.query(`
                select id, category_name from categories where parent_id  = $1
                
                `, [categoryId])
                
                res.status(200).json(sbCat.rows)
        } catch (error) {
            console.error('Ошибка:', error);
          res.status(500).send('Ошибка сервера');
        }

      }
      
      
      async getSubCategoryByBrand(req, res) {
        const { brandId} = req.params;
        const { categoryId } = req.query;
    
        try {
            let query;
            let params;
    
            if (categoryId) {
                query = `
                    WITH RECURSIVE category_hierarchy AS (
                    SELECT c.id, c.parent_id, c.category_name
                    FROM categories c
                    JOIN product p ON c.id = p.category
                    WHERE p.brand_id = $1 AND c.parent_id = $2

                    UNION ALL

                    SELECT parent.id, parent.parent_id, parent.category_name
                    FROM categories parent
                    JOIN category_hierarchy child ON parent.id = child.parent_id
                )
                SELECT DISTINCT c.id, c.category_name
                FROM category_hierarchy c
                JOIN categories parent ON c.parent_id = parent.id
                WHERE c.id != $2;
                    
                `;
                params = [brandId, categoryId];
            } else {
                query = `
                    WITH RECURSIVE category_hierarchy
                     AS (
                        SELECT c.id, c.parent_id, c.category_name
                        FROM categories c
                        JOIN product p ON c.id = p.category
                        WHERE p.brand_id = $1
    
                        UNION ALL
    
                        SELECT parent.id, parent.parent_id, parent.category_name
                        FROM categories parent
                        JOIN category_hierarchy child ON parent.id = child.parent_id
                    )
                    SELECT DISTINCT c.id, c.category_name
                    FROM category_hierarchy c
                    JOIN categories parent ON c.parent_id = parent.id
                    WHERE parent.parent_id = 0;
                `;
                params = [brandId];
            }
    
            const sbCat = await pool.query(query, params);
            res.status(200).json(sbCat.rows);
        } catch (error) {
            console.error('Ошибка:', error);
            res.status(500).send('Ошибка сервера');
        }
    }
    async getBrandAttribute(req, res) {
        const { brandId } = req.params; 
        const { categoryId } = req.query;
        
        try {
            const attributes = await pool.query(`
                WITH RECURSIVE category_tree AS (
                    SELECT id, parent_id, category_name
                    FROM categories
                    WHERE id = $1  
    
                    UNION ALL
    
                    SELECT c.id, c.parent_id, c.category_name
                    FROM categories c
                    INNER JOIN category_tree ct ON c.parent_id = ct.id
                )
                SELECT 
                    at.attribute_name, 
                    pa.value,
                    COUNT(DISTINCT pa.product_id) AS product_count
                FROM product_attributes pa
                LEFT JOIN attributes at ON pa.attribute_id = at.attribute_id
                LEFT JOIN product p ON pa.product_id = p.product_id
                INNER JOIN category_tree ct ON p.category = ct.id
                WHERE 
                    at.attribute_name IS NOT NULL
                    AND p.brand_id = $2  -- Фильтр по бренду
                GROUP BY 
                    at.attribute_name, pa.value
                ORDER BY 
                    at.attribute_name;
            `, [categoryId, brandId]);
    
            const groupedAttributes = attributes.rows.reduce((acc, { attribute_name, value, product_count }) => {
                if (!acc[attribute_name]) {
                    acc[attribute_name] = [];
                }
                acc[attribute_name].push({ value, product_count });
                return acc;
            }, {});
    
            res.status(200).json(groupedAttributes);
        } catch (error) {
            console.error('Ошибка:', error);
            res.status(500).send('Ошибка сервера');
        }
    }



    

      async getAttribute(req, res){
            const {categotyId} = req.params
            console.log(categotyId)

        try {
            const attributes = await pool.query(`
                WITH RECURSIVE category_tree AS (
                    SELECT id, parent_id, category_name
                    FROM categories
                    WHERE id = $1  

                    UNION ALL

                    SELECT c.id, c.parent_id, c.category_name
                    FROM categories c
                    INNER JOIN category_tree ct ON c.parent_id = ct.id
                )
                SELECT 
                    at.attribute_name, 
                    pa.value,
                    COUNT(DISTINCT pa.product_id) AS product_count
                FROM product_attributes pa
                LEFT JOIN attributes at ON pa.attribute_id = at.attribute_id
                LEFT JOIN product p ON pa.product_id = p.product_id
                INNER JOIN category_tree ct ON p.category = ct.id
                WHERE 
                    at.attribute_name IS NOT NULL
                GROUP BY 
                    at.attribute_name, pa.value
                ORDER BY 
                    at.attribute_name;


                
                `,[categotyId])
                
                const groupedAttributes = attributes.rows.reduce((acc, { attribute_name, value, product_count }) => {
                    if (!acc[attribute_name]) {
                        acc[attribute_name] = [];
                    }
                    acc[attribute_name].push({ value, product_count });
                    return acc;
                    }, {}); 
                
                res.status(200).json(groupedAttributes)
                
            } catch (error) {
                console.error('Ошибка:', error);
              res.status(500).send('Ошибка сервера');
            }
      }

    // async getMinMAxPrice (req,res){
    //    try {
    //         const price = await pool.query(`
    //             SELECT MIN(price) AS min_price, MAX(price) AS max_price FROM product
    //             `)
    //             res.status(200).json(price.rows[0])
    //    } catch (error) {
    //     console.error('Ошибка:', error);
    //     res.status(500).send('Ошибка сервера');
    //    } 
    // }
}

module.exports = new ProductController();


