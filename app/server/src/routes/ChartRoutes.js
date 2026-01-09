const express = require('express');
const router = express.Router();
const chartController = require('../controllers/ChartController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, chartController.getChartsData);

module.exports = router;