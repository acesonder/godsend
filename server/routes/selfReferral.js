const express = require('express');
const router = express.Router();
const selfReferralController = require('../controllers/selfReferralController');
const { authenticateToken } = require('../middleware/auth');

// Public routes (no authentication required)
router.post('/step1/client-info', selfReferralController.submitClientInfo);
router.post('/step2/account-setup', selfReferralController.setupAccount);
router.get('/agencies', selfReferralController.getAgencies);

// Protected routes (require authentication)
router.post('/step3/consent', authenticateToken, selfReferralController.setupConsent);

module.exports = router;
