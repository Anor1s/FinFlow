const CurrencyService = require('./CurrencyService');
const pool = require('../database/DataBase');

const CurrencySyncService = {
  async syncRatesForUser(baseCurrency) {
    try {
      const currenciesRes = await pool.query(
        'SELECT DISTINCT currency FROM transactions'
      );

      const usedCurrencies = currenciesRes.rows.map(r => r.currency);

      for (const fromCurr of usedCurrencies) {
        if (fromCurr === baseCurrency) continue;

        const rate = await CurrencyService.getExchangeRate(fromCurr, baseCurrency);

        await pool.query(`
          INSERT INTO exchange_rates (from_currency, to_currency, rate, updated_at)
          VALUES ($1, $2, $3, NOW())
          ON CONFLICT (from_currency, to_currency) 
          DO UPDATE SET rate = $3, updated_at = NOW()
        `, [fromCurr, baseCurrency, rate]);
      }

      console.log(`Rates for ${baseCurrency} successfully updated.`);
    } catch (error) {
      console.error('Synchronization error:', error.message);
    }
  }
};

module.exports = CurrencySyncService;