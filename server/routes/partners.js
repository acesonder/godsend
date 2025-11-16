const express = require('express');
const router = express.Router();
const partnersController = require('../controllers/partnersController');
const { writeLimiter } = require('../middleware/rateLimiter');

// Submit partner application
router.post('/apply', writeLimiter, partnersController.submitApplication);

module.exports = router;
