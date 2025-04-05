const { Pool } = require('pg');

// Строка подключения для локальной разработки и продакшн
const connectionString = process.env.DATABASE_URL; 

// Пул соединений для работы с базой данных
const pool = new Pool({
    connectionString: connectionString,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false // Включаем SSL для Render
});

module.exports = pool;