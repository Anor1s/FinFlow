const express = require('express');
const cookieParser = require('cookie-parser');
const { PORT, CORS_ORIGIN } = require('./src/config/Constants');
const pool = require('./src/database/DataBase');

const authRoutes = require('./src/routes/AuthRoutes');
const transactionRoutes = require('./src/routes/TransactionRoutes');
const summaryRoutes = require('./src/routes/SummaryRoutes');
const chartRoutes = require('./src/routes/ChartRoutes');
const userSettingsRoutes = require('./src/routes/UserSettingsRoutes');

const currencySyncService = require('./src/services/CurrencySyncService');

const app = express();

// CORS Configuration (crucial for credentials: 'include')
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(cookieParser());

// Routes configuration
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/charts', chartRoutes);
app.use('/api/settings', userSettingsRoutes);

// Database connection health check
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Successfully connected to the database');
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('SERVER ERROR STACK:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start the server
app.listen(PORT, async () => {
  console.log(`FinFlow server is running on port ${PORT}`);
  console.log(`Allowed Origin: ${CORS_ORIGIN}`);

  try {

    await currencySyncService.syncRatesForUser('UAH');
    await currencySyncService.syncRatesForUser('USD');
    await currencySyncService.syncRatesForUser('EUR');
  } catch (err) {
    console.error('Synchronization error at startup:', err.message);
  }
});