const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const { readLimiter, writeLimiter } = require('../middleware/rateLimiter');

// Get all upcoming public events
router.get('/', readLimiter, eventsController.getUpcomingEvents);

// Get single event
router.get('/:id', readLimiter, eventsController.getEvent);

// Register for an event
router.post('/:id/register', writeLimiter, eventsController.registerForEvent);

module.exports = router;
