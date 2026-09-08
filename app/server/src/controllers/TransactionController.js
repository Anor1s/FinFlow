const pool = require('../database/DataBase');
const currencyService = require('../services/CurrencyService');

exports.getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const dataQuery = `
        SELECT id, amount, currency, amount_base, exchange_rate, category,
               transaction_date as date, transaction_time as time, 
               transaction_type as "transactionType", transaction_place as place, note
        FROM transactions
        WHERE user_id = $1
        ORDER BY transaction_date DESC, transaction_time DESC
        LIMIT $2 OFFSET $3
    `;

    const countQuery = `SELECT COUNT(*) FROM transactions WHERE user_id = $1`;

    const [result, countResult] = await Promise.all([
      pool.query(dataQuery, [userId, limit, offset]),
      pool.query(countQuery, [userId])
    ]);

    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    const formattedData = result.rows.map(item => ({
      ...item,
      amount: parseFloat(item.amount),
      amount_base: parseFloat(item.amount_base),
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : null,
      time: item.time ? item.time.substring(0, 5) : null
    }));

    res.json({
      transactions: formattedData,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (err) {
    console.error("GET_TRANSACTIONS_ERROR:", err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      amount,
      currency,
      category,
      date,
      time,
      transactionType,
      transactionPlace,
      note
    } = req.body;

    const categoryValue = category?.value || 'General';
    const typeNormalized = transactionType?.toLowerCase() === 'income' ? 'income' : 'expense';

    const finalDate = date && date !== '' ? date : new Date().toISOString().split('T')[0];
    const finalTime = time && time !== '' ? time : new Date().toLocaleTimeString('en-US', { hour12: false }).substring(0, 5);

    const userRes = await pool.query('SELECT base_currency FROM users WHERE id = $1', [userId]);
    const baseCurrency = userRes.rows[0]?.base_currency || 'USD';

    const exchangeRate = await currencyService.getExchangeRate(currency, baseCurrency);

    const amountNum = parseFloat(amount) || 0;
    const amountBase = (amountNum * exchangeRate).toFixed(2);

    const values = [
      userId,
      amountNum,
      currency,
      amountBase,
      exchangeRate,
      categoryValue,
      finalDate,
      finalTime,
      typeNormalized,
      transactionPlace || '',
      note || ''
    ];

    const query = `
        INSERT INTO transactions (
            user_id, amount, currency, amount_base, exchange_rate,
            category, transaction_date, transaction_time,
            transaction_type, transaction_place, note
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *;
    `;

    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Transaction added successfully',
      transaction: result.rows[0]
    });

  } catch (err) {
    // Log the error for backend debugging
    console.error("CREATE_TRANSACTION_ERROR:", err);
    res.status(500).json({
      error: 'Server error while creating transaction',
      details: err.message
    });
  }
};


exports.deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Transaction not found or unauthorized' });
    }

    res.json({ message: 'Transaction deleted successfully', id });
  } catch (err) {
    console.error("DELETE_TRANSACTION_ERROR:", err);
    res.status(500).json({ error: 'Server error while deleting transaction' });
  }
};