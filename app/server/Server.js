require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { PORT } = require('./src/config/Constants');
const pool = require('./src/database/DataBase');

const authRoutes = require('./src/routes/AuthRoutes');
const transactionRoutes = require('./src/routes/TransactionRoutes');
const summaryRoutes = require('./src/routes/SummaryRoutes');
const chartRoutes = require('./src/routes/ChartRoutes');
const userSettingsRoutes = require('./src/routes/UserSettingsRoutes');

const currencySyncService = require('./src/services/CurrencySyncService');

const app = express();

const allowedOrigins = [
  process.env.LOCAL_URL,
  process.env.CORS_ORIGIN
].filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/charts', chartRoutes);
app.use('/api/settings', userSettingsRoutes);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Successfully connected to the database');
  }
});

app.use((err, req, res, next) => {
  console.error('SERVER ERROR STACK:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

app.listen(PORT, async () => {
  console.log(`FinFlow server is running on port ${PORT}`);
  console.log(`Monitoring allowed origins: ${allowedOrigins.join(', ')}`);

  try {
    await currencySyncService.syncRatesForUser(null, 'UAH');
    await currencySyncService.syncRatesForUser(null, 'USD');
    await currencySyncService.syncRatesForUser(null, 'EUR');
    console.log('Currency synchronization completed at startup');
  } catch (err) {
    console.error('Synchronization error at startup:', err.message);
  }
});