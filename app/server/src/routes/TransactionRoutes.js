const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/TransactionController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.get('/AllTransactions', authMiddleware, transactionController.getAllTransactions);
router.post('/CreateTransaction', authMiddleware, transactionController.createTransaction);
router.delete('/DeleteTransaction/:id', authMiddleware, transactionController.deleteTransaction);

module.exports = router;