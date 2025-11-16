const express = require('express');
const router = express.Router();
const incidentReportController = require('../controllers/incidentReportController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { readLimiter, writeLimiter } = require('../middleware/rateLimiter');

// Public routes
router.post('/submit', writeLimiter, incidentReportController.submitReport);
router.get('/types', readLimiter, incidentReportController.getReportTypes);

// Protected routes (worker/admin only)
router.get('/', readLimiter, authenticateToken, authorizeRoles('worker', 'admin'), incidentReportController.getAllReports);
router.get('/stats', readLimiter, authenticateToken, authorizeRoles('admin'), incidentReportController.getReportStats);
router.get('/:id', readLimiter, authenticateToken, authorizeRoles('worker', 'admin'), incidentReportController.getReportById);
router.put('/:id', writeLimiter, authenticateToken, authorizeRoles('worker', 'admin'), incidentReportController.updateReport);
router.post('/:id/assign', writeLimiter, authenticateToken, authorizeRoles('admin'), incidentReportController.assignReport);

module.exports = router;
