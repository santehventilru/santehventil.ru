const  Pool  = require('pg').Pool;

const pool = new Pool({ // Создаем пул соединений с базой данных PostgreSQL
    user: "postgres",
    password: "2541",
    host: "localhost",
    port: 5432,
    database: "plumbing"
  });
  
  module.exports = pool;