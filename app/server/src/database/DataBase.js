const { Pool } = require('pg');
const { DB_CONFIG } = require('../config/Constants');

const pool = new Pool(DB_CONFIG);

module.exports = pool;