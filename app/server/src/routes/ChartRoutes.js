const express = require('express');
const router = express.Router();
const chartController = require('../controllers/ChartController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.get('/', authMiddleware, chartController.getChartsData);

module.exports = router;