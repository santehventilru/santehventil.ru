const Redis = require("ioredis");

// Подключение к Redis с использованием переменной окружения REDIS_URL
const redis = new Redis(process.env.REDIS_URL);

// Проверка соединения
redis.on("connect", () => {
  console.log("Успешно подключено к Redis!");
});

redis.on("error", (err) => {
  console.error("Ошибка подключения к Redis:", err);
});

module.exports = redis;
