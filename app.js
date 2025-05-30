const express = require('express'); 
const bodyParser = require('body-parser'); 
const session = require('express-session'); 
const fs = require('fs');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const cors = require('cors');
const csrf = require('csurf');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();
const RedisStore = require('connect-redis')(session);
const https = require('https')


const redisClient = require('./src/config/redisClient'); // Подключаем ранее созданный redisClient


const brandRoutes = require('./src/routes/brandRoutes');
const productRoutes = require('./src/routes/productRoutes');
const deliveryRoutes = require('./src/routes/deliveryRoutes');
const imageRoutes = require('./src/routes/imageRoutes');
const ordersRoutes = require('./src/routes/ordersRoutes');
const favRoots = require('./src/routes/favRoots');
const reviewRoutes = require('./src/routes/reviewRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const productPage = require('./src/routes/productRoutes');
/* const subCatalog = require('./src/routes/productRoutes'); */

const app = express(); // Создаем экземпляр приложения Express

//TODO  раскомент при подключении htpps
// app.use((req, res, next) => {
//   if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
//     next();
//   } else {
//     res.redirect(`https://${req.headers.host}${req.url}`);
//   }
// });
// Настройка EJS как шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json()); // Парсинг JSON
app.use(bodyParser.urlencoded({ extended: true })); // Парсинг URL-кодированных данных
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new RedisStore({ client: redisClient, logErrors: true }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // В production (по https) включаем secure + sameSite:none
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));;

app.use(helmet({
  contentSecurityPolicy: false,
  hsts: {
    maxAge: 63072000, // 2 года
    includeSubDomains: true,
    preload: true
  }
}));

const pathToDist = path.resolve(__dirname, 'frontend', 'dist');

app.use(express.static(pathToDist));

// Rate Limiting
app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Слишком много запросов с этого IP, попробуйте позже',
  // И здесь тоже задаём то же самое число
  trustProxy: 1
});
app.use(limiter);

//Отправа данных на почту 
const transporter = nodemailer.createTransport({
  service: 'mail', // Или другой используемый вами почтовый сервис
  auth: {
      user: 'ilya.pavlenkotio@mail.ru',
      pass: 'Gorillaz12' // Имейте в виду, что это небезопасно
    
  }
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
      from: 'ilya@ilya.room177',
      to: to,
      subject: subject,
      text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return res.status(500).send('Error: ' + error.toString());
      }
      res.status(200).send('Email sent: ' + info.response);
  });
});



// CSRF Protection
// const csrfProtection = csrf({ cookie: true });

// // Применение CSRF защиты только к маршрутам представлений
// app.use(['/view', '/another-view-route'], csrfProtection); // Укажите маршруты для представлений

// // Middleware для передачи CSRF-токена в шаблоны
// app.use((req, res, next) => {
//     if (req.csrfToken) {
//         res.locals.csrfToken = req.csrfToken(); // для шаблонов
//         res.cookie('XSRF-TOKEN', req.csrfToken()); // для AJAX запросов
//     }
//     next();
// });

// Подключение маршрутов API
app.use('/', productRoutes);
app.use('/', brandRoutes);
app.use('/', deliveryRoutes);
app.use('/', imageRoutes);
app.use('/', ordersRoutes);
app.use('/', reviewRoutes);
app.use('/', favRoots);
app.use('/', profileRoutes);
app.use('/', productPage);


/**Static*/
app.get('/shippingInformation', (req, res) => {
  res.render('shippingInformation'); 
});//инфа доставка

// Глобальная обработка ошибок
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    // Обработка ошибок CSRF
    return res.status(403).send('Неверный CSRF токен');
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Настройка CORS
app.use(cors({
  origin: ['https://santehventil.ru', 'https://www.santehventil.ru'],
  credentials: true
}));

app.use(express.static(pathToDist, {
  setHeaders: (res) => {
    res.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
}));
app.get('*', (req, res) => {
  res.sendFile(path.join(pathToDist, 'index.html'));
});

/* app.get('/brands', (req, res) => {

  res.render('brands');
  
  }); */


  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0',  () => console.log(`Server running on port ${PORT}`));
