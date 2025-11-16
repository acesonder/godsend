const express = require('express');
const router = express.Router();
const qaController = require('../controllers/qaController');
const { writeLimiter } = require('../middleware/rateLimiter');

// Submit a question
router.post('/submit', writeLimiter, qaController.submitQuestion);

module.exports = router;
