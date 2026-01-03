const pool = require('../database/DataBase');
const CurrencySyncService = require('../services/CurrencySyncService');

exports.updateStandardCurrency = async (req, res) => {
  try {
    const userId = req.user.id;
    const { baseCurrency } = req.body;

    if (!baseCurrency) {
      return res.status(400).json({ error: 'Currency not specified' });
    }

    await pool.query('UPDATE users SET base_currency = $1 WHERE id = $2', [baseCurrency, userId]);
    await CurrencySyncService.syncRatesForUser(baseCurrency);

    const massUpdateQuery = `
      UPDATE transactions t
      SET 
        amount_base = t.amount * COALESCE(er.rate, 1),
        exchange_rate = COALESCE(er.rate, 1)
      FROM exchange_rates er
      WHERE t.user_id = $1 
        AND er.from_currency = t.currency 
        AND er.to_currency = $2
    `;

    await pool.query(massUpdateQuery, [userId, baseCurrency]);

    res.json({
      message: 'Settings updated and history recalculated using exchange_rates table',
      baseCurrency
    });

  } catch (err) {
    console.error("UPDATE_SETTINGS_ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};