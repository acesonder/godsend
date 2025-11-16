const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// Get all published FAQs
router.get('/', faqController.getAllFAQs);

// Get FAQs by category
router.get('/category/:category', faqController.getFAQsByCategory);

// Get single FAQ
router.get('/:id', faqController.getFAQ);

module.exports = router;
