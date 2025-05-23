// const Redis = require("ioredis");

// // Подключение к Redis с использованием переменной окружения REDIS_URL
// const redis = new Redis(process.env.REDIS_URL);

// // Проверка соединения
// redis.on("connect", () => {
//   console.log("Успешно подключено к Redis!");
// });

// redis.on("error", (err) => {
//   console.error("Ошибка подключения к Redis:", err);
// });

// module.exports = redis;


// src/config/redisClient.js
const Redis = require('ioredis');

// Считываем параметры из окружения
const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USER,
  REDIS_PASS
} = process.env;

// Проверим, что всё задано
if (!REDIS_HOST || !REDIS_PORT || !REDIS_PASS) {
  throw new Error('Missing REDIS_HOST, REDIS_PORT or REDIS_PASS env vars');
}

// Создаём клиент по объекту, а не строке URL
const redis = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  username: REDIS_USER,    // можно опустить, default-user
  password: REDIS_PASS,
  // если нужен TLS:
  // tls: {}
});

redis.on('connect', () => {
  console.log('Успешно подключено к Redis!');
});
redis.on('error', err => {
  console.error('Ошибка подключения к Redis:', err);
});

module.exports = redis;
