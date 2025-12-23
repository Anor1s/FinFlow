const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.delete('/delete', authMiddleware, authController.deleteAccount);
router.get('/protected', authMiddleware, authController.getProfile);
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;