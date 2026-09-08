const pool = require('../database/DataBase');

exports.getSummary = async (req, res) => {
  try {
    const userId = req.user.id;

     const getBaseCurrencyQuery = `
       SELECT base_currency FROM users WHERE id = $1
     `;

    const userRes = await pool.query(getBaseCurrencyQuery, [userId]);
    const currentBaseCurrency = userRes.rows[0]?.base_currency || 'USD';

    const getSummaryQuery = `
        SELECT
            COUNT(id) AS "transactionsCount",
            COALESCE(SUM(CASE WHEN transaction_type = 'income' THEN amount_base ELSE 0 END), 0) AS "totalIncome",
            COALESCE(SUM(CASE WHEN transaction_type = 'expense' THEN amount_base ELSE 0 END), 0) AS "totalSpending",
   
            COALESCE(SUM(CASE
                             WHEN transaction_type = 'income' THEN amount_base
                             WHEN transaction_type = 'expense' THEN -amount_base
                             ELSE 0 END), 0) AS "balance",

            COALESCE(SUM(CASE WHEN category IN ('savings') THEN amount_base ELSE 0 END), 0) AS "totalSavings"
        FROM transactions
        WHERE user_id = $1
    `;

    const result = await pool.query(getSummaryQuery, [userId]);
    const data = result.rows[0];

    const formattedData = {
      transactionsCount: parseInt(data.transactionsCount),
      totalIncome: parseFloat(data.totalIncome).toFixed(2),
      totalSpending: parseFloat(data.totalSpending).toFixed(2),
      balance: parseFloat(data.balance).toFixed(2),
      totalSavings: parseFloat(data.totalSavings).toFixed(2),
      currency: currentBaseCurrency
    };

    res.json({
      message: 'Dashboard data retrieved successfully',
      summary: formattedData
    });

  } catch (err) {
    console.error("GET_DASHBOARD_DATA_ERROR:", err.message);
    res.status(500).json({
      error: 'Server error while retrieving dashboard data',
      details: err.message
    });
  }
};