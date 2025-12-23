const { Pool } = require('pg');
const { DB_CONFIG } = require('../config/Constants');

const pool = new Pool(DB_CONFIG);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Successfully connected to the database');
  }
});


module.exports = pool;