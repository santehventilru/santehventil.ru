const Router = require('express');
const isAdmin = require('../middlewares/adminmiddleware');
const isAuthenticated = require('../middlewares/authmiddleware');
const router = new Router();
require('dotenv').config();


const daData = async (req, res) => {
    const {query} = req.body
    const token = process.env.SK_DADATA_KEY
    const url = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'

    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
    }

    try {
        const response  = await fetch(url, options)
        const data  = await response.json()
        res.json(data)
    } catch (error) {
        console.error("Ошибка запроса к Dadata:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
}

router.post('/api/dadata/palace', daData)


module.exports = router;