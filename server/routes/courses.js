const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const { authenticate } = require('../middleware/auth');
const { readLimiter, writeLimiter } = require('../middleware/rateLimiter');

// Get all published courses
router.get('/', readLimiter, coursesController.getAllCourses);

// Get courses by type
router.get('/type/:type', readLimiter, coursesController.getCoursesByType);

// Get single course
router.get('/:id', readLimiter, coursesController.getCourse);

// Track course progress (requires authentication)
router.post('/:id/progress', writeLimiter, authenticate, coursesController.updateProgress);

// Get user's course progress (requires authentication)
router.get('/:id/my-progress', readLimiter, authenticate, coursesController.getMyProgress);

module.exports = router;
