const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/SummaryController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.get('/', authMiddleware, summaryController.getSummary);

module.exports = router;