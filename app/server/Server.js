const express = require('express');
const cookieParser = require('cookie-parser');
const { PORT, CORS_ORIGIN } = require('./src/config/Constants');
const authRoutes = require('./src/routes/AuthRoutes');
const pool = require('./src/database/DataBase');

const app = express();

// 1. Налаштування CORS (важливо для credentials: 'include')
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');


  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(cookieParser());


app.use('/api', authRoutes);

app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).json({ error: 'Щось пішло не так на сервері' });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер FinFlow працює на порту ${PORT}`);
  console.log(`👉 Дозволений Origin: ${CORS_ORIGIN}`);
});