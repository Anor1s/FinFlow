const CurrencyService = require('./CurrencyService');
const pool = require('../database/DataBase');

const CurrencySyncService = {
  async syncRatesForUser(userId = null, baseCurrency) {
    try {
      let currenciesRes;

      if (userId) {
        currenciesRes = await pool.query(
          'SELECT DISTINCT currency FROM transactions WHERE user_id = $1',
          [userId]
        );
      } else {
        currenciesRes = await pool.query(
          'SELECT DISTINCT currency FROM transactions'
        );
      }

      const usedCurrencies = currenciesRes.rows.map(r => r.currency);

      const defaultCurrencies = ['UAH', 'USD', 'EUR'];
      const allToSync = [...new Set([...usedCurrencies, ...defaultCurrencies])];

      for (const fromCurr of allToSync) {
        const rate = (fromCurr === baseCurrency)
          ? 1.0
          : await CurrencyService.getExchangeRate(fromCurr, baseCurrency);

        await pool.query(`
          INSERT INTO exchange_rates (from_currency, to_currency, rate, updated_at)
          VALUES ($1, $2, $3, NOW())
          ON CONFLICT (from_currency, to_currency) 
          DO UPDATE SET rate = $3, updated_at = NOW()
        `, [fromCurr, baseCurrency, rate]);
      }
    } catch (error) {
      console.error('Sync error:', error.message);
    }
  }
};

module.exports = CurrencySyncService;