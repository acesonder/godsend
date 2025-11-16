const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const { authenticate } = require('../middleware/auth');

// Get all published courses
router.get('/', coursesController.getAllCourses);

// Get courses by type
router.get('/type/:type', coursesController.getCoursesByType);

// Get single course
router.get('/:id', coursesController.getCourse);

// Track course progress (requires authentication)
router.post('/:id/progress', authenticate, coursesController.updateProgress);

// Get user's course progress (requires authentication)
router.get('/:id/my-progress', authenticate, coursesController.getMyProgress);

module.exports = router;
