const pool = require('../config/db');


class brandController {
    async createBrand(req, res) {
        try {
            const {name, country, desc} = req.body;
            const newbrand = await pool.query('insert into brand (name, country, description) values ($1, $2, $3) returning *', [name, country, desc]);
            if (newbrand.rows.length > 0) {
              res.json(newbrand.rows[0]);
            } else {
              res.status(404).json({ error: 'Brand is not created' });
            }
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        
    };

    async updateBrand(req, res) {
        try {
            const {name, desc} = req.body;
            const updatedbrand = await pool.query('update brand set description=$2 where name = $1 returning *', [name, desc])
            if (updatedbrand.rows.length > 0) {
              res.json(updatedbrand.rows[0]);
            } else {
              res.status(404).json({ error: 'Brand is not updated' });
            }
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        
    };

    async getAllBrands(req, res) {
        try {
          // Запрос брендов с присоединением изображений
          const brands = await pool.query(`
              SELECT b.brand_id, b.name, b.description, bi.filename
              FROM brand b
              LEFT JOIN brand_images bi ON b.brand_id = bi.brand_id
          `);

          if (brands.rows.length > 0) {
              res.render('brands', { title: 'Brands', brands: brands.rows });
          } else {
              res.status(404).json({ error: 'No brands found' });
          }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    async getBrandByName(req, res) {
        try {
            const {name} = req.params;
            const brand = await pool.query('SELECT * FROM brand b left join brand_images bi on b.brand_id = bi.brand_id WHERE b.brand_id in (select brand_id from brand where name ilike $1)', [`%${name}%`]);
            if (brand.rows.length > 0) {
              res.json(brand.rows);
            } else {
              res.status(404).json({ error: 'Brand not found b' });
            }
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    };
    async getBrandByIdEjs(req, res) {
      try {
          const {id} = req.params;
          const brand = await pool.query('SELECT b.*, bi.filename FROM brand b LEFT JOIN brand_images bi ON b.brand_id = bi.brand_id WHERE b.brand_id = $1', [id]);
          if (brand.rows.length > 0) {
            res.render('brandPage', {title: brand.rows[0].name, brand :brand.rows[0]});
          } else {
            res.status(404).json({ error: 'Brand not found c' });
            window.location.href = '/page404'
          }
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    };

    async getBrandById(req, res) {
        try {
            const {id} = req.params;
            const brand = await pool.query('SELECT * FROM brand WHERE brand_id = $1', [id]);
            if (brand.rows.length > 0) {
              res.json(brand.rows[0]);
            } else {
              res.status(404).json({ error: 'Brand not found c' });
              window.location.href = '/page404'
            }
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    };

    async deleteBrand(req, res) {
    
    };
    async getAllBrandsJson(req, res) {
      try {
        // Запрос брендов с присоединением изображений
        const brands = await pool.query(`
            SELECT b.brand_id, b.name, b.description, bi.filename
            FROM brand b
            LEFT JOIN brand_images bi ON b.brand_id = bi.brand_id
        `);

        if (brands.rows.length > 0) {
            res.json(brands.rows);
        } else {
            res.status(404).json({ error: 'No brands found' });
        }
      } catch (err) {
          res.status(500).json({ error: err.message });
      }
  };

    }
module.exports = new brandController();