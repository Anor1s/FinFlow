const CurrencyService = require('./CurrencyService');
const pool = require('../database/DataBase');

const CurrencySyncService = {
  async syncRatesForUser(userId, baseCurrency) {
    try {
      const currenciesRes = await pool.query(
        'SELECT DISTINCT currency FROM transactions WHERE user_id = $1',
        [userId]
      );

      const usedCurrencies = currenciesRes.rows.map(r => r.currency);

      for (const fromCurr of usedCurrencies) {
        let rate;
        if (fromCurr === baseCurrency) {
          rate = 1.0;
        } else {
          rate = await CurrencyService.getExchangeRate(fromCurr, baseCurrency);
        }

        await pool.query(`
            INSERT INTO exchange_rates (from_currency, to_currency, rate, updated_at)
            VALUES ($1, $2, $3, NOW())
            ON CONFLICT (from_currency, to_currency) 
            DO UPDATE SET rate = $3, updated_at = NOW()
        `, [fromCurr, baseCurrency, rate]);
      }

      console.log(`Rates for User ${userId} updated to base: ${baseCurrency}`);
    } catch (error) {
      console.error('Synchronization error:', error.message);
    }
  }
};

module.exports = CurrencySyncService;