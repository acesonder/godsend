const express = require('express');
const router = express.Router();
const qaController = require('../controllers/qaController');

// Submit a question
router.post('/submit', qaController.submitQuestion);

module.exports = router;
