const express = require('express');
const router = express.Router();
const incidentReportController = require('../controllers/incidentReportController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Public routes
router.post('/submit', incidentReportController.submitReport);
router.get('/types', incidentReportController.getReportTypes);

// Protected routes (worker/admin only)
router.get('/', authenticateToken, authorizeRoles('worker', 'admin'), incidentReportController.getAllReports);
router.get('/stats', authenticateToken, authorizeRoles('admin'), incidentReportController.getReportStats);
router.get('/:id', authenticateToken, authorizeRoles('worker', 'admin'), incidentReportController.getReportById);
router.put('/:id', authenticateToken, authorizeRoles('worker', 'admin'), incidentReportController.updateReport);
router.post('/:id/assign', authenticateToken, authorizeRoles('admin'), incidentReportController.assignReport);

module.exports = router;
