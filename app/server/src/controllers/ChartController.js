const pool = require('../database/DataBase');

const ChartController = {
  getChartsData: async (req, res) => {
    try {
      const userId = req.user.id;
      const { from, to } = req.query;
      const fromDate = from || '1900-01-01';
      const toDate = to || new Date().toISOString();

      const userRes = await pool.query('SELECT base_currency FROM users WHERE id = $1', [userId]);
      const baseCurrency = userRes.rows[0]?.base_currency || 'USD';

      const categoryQuery = `
        SELECT 
          t.category, 
          SUM(t.amount * COALESCE(er.rate, 1)) as amount
        FROM transactions t
        LEFT JOIN exchange_rates er 
          ON er.from_currency = t.currency 
          AND er.to_currency = $4
        WHERE t.user_id = $1 
          AND t.transaction_type = 'expense'
          AND t.transaction_date BETWEEN $2 AND $3
        GROUP BY t.category
        ORDER BY amount DESC
      `;

      const monthlyQuery = `
          SELECT
            TO_CHAR(t.transaction_date, 'Mon YYYY') as month, 
          SUM(CASE WHEN t.transaction_type = 'income' THEN t.amount * COALESCE(er.rate, 1) ELSE 0 END) as income,
          SUM(CASE WHEN t.transaction_type = 'expense' AND t.category != 'savings' THEN t.amount * COALESCE(er.rate, 1) ELSE 0 END) as expenses,
          SUM(CASE 
              WHEN t.category = 'savings' AND t.transaction_type = 'income' THEN t.amount * COALESCE(er.rate, 1)
              WHEN t.category = 'savings' AND t.transaction_type = 'expense' THEN -(t.amount * COALESCE(er.rate, 1))
              ELSE 0 
            END) as savings,
          date_trunc('month', t.transaction_date) as month_date
          FROM transactions t
            LEFT JOIN exchange_rates er
          ON er.from_currency = t.currency
            AND er.to_currency = $4
          WHERE t.user_id = $1 AND t.transaction_date BETWEEN $2 AND $3
          GROUP BY month, month_date
          ORDER BY month_date ASC
      `;

      const [monthlyRes, categoryRes] = await Promise.all([
        pool.query(monthlyQuery, [userId, fromDate, toDate, baseCurrency]),
        pool.query(categoryQuery, [userId, fromDate, toDate, baseCurrency])
      ]);

      res.status(200).json({
        baseCurrency,
        monthlyStats: monthlyRes.rows.map(row => ({
          month: row.month,
          income: parseFloat(row.income) || 0,
          expenses: parseFloat(row.expenses) || 0,
          savings: parseFloat(row.savings) || 0
        })),
        categoryStats: categoryRes.rows.map(c => ({
          category: c.category,
          amount: parseFloat(c.amount) || 0
        }))
      });

    } catch (error) {
      console.error('SERVER_ERROR:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = ChartController;