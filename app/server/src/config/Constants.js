require('dotenv').config();

module.exports = {
  PORT: parseInt(process.env.PORT),
  SECRET: process.env.SECRET || 'default_secret',
  ACCESS_TOKEN_EXPIRY: parseInt(process.env.ACCESS_TOKEN_EXPIRY),
  REFRESH_TOKEN_EXPIRY: parseInt(process.env.REFRESH_TOKEN_EXPIRY),
  CORS_ORIGIN: process.env.CORS_ORIGIN,

  DB_CONFIG: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
  }
};