const express = require('express');
const router = express.Router();
const selfReferralController = require('../controllers/selfReferralController');
const { authenticateToken } = require('../middleware/auth');
const { readLimiter, writeLimiter } = require('../middleware/rateLimiter');

// Public routes (no authentication required)
router.post('/step1/client-info', writeLimiter, selfReferralController.submitClientInfo);
router.post('/step2/account-setup', writeLimiter, selfReferralController.setupAccount);
router.get('/agencies', readLimiter, selfReferralController.getAgencies);

// Protected routes (require authentication)
router.post('/step3/consent', writeLimiter, authenticateToken, selfReferralController.setupConsent);

module.exports = router;
