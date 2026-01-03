const express = require('express');
const router = express.Router();
const userSettingsController = require('../controllers/UserSettingsController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.patch('/StandardCurrency', authMiddleware, userSettingsController.updateStandardCurrency);

module.exports = router;