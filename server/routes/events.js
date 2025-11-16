const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

// Get all upcoming public events
router.get('/', eventsController.getUpcomingEvents);

// Get single event
router.get('/:id', eventsController.getEvent);

// Register for an event
router.post('/:id/register', eventsController.registerForEvent);

module.exports = router;
