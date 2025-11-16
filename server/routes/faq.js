const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const { readLimiter } = require('../middleware/rateLimiter');

// Get all published FAQs
router.get('/', readLimiter, faqController.getAllFAQs);

// Get FAQs by category
router.get('/category/:category', readLimiter, faqController.getFAQsByCategory);

// Get single FAQ
router.get('/:id', readLimiter, faqController.getFAQ);

module.exports = router;
