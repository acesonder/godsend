const express = require('express');
const router = express.Router();
const partnersController = require('../controllers/partnersController');

// Submit partner application
router.post('/apply', partnersController.submitApplication);

module.exports = router;
