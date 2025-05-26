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
const Redis = require("ioredis");

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USER,
  REDIS_PASS
} = process.env;

if (!REDIS_HOST || !REDIS_PORT || !REDIS_PASS) {
  throw new Error("Не заданы REDIS_HOST, REDIS_PORT или REDIS_PASS в .env");
}

const redis = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  username: REDIS_USER,   // опционально, если используется ACL
  password: REDIS_PASS,
  // tls: {}               // раскомментируйте, если нужно шифрование
});

redis.on("connect", () => {
  console.log("Успешно подключено к Redis!");
});

redis.on("error", (err) => {
  console.error("Ошибка подключения к Redis:", err);
});

module.exports = redis;
