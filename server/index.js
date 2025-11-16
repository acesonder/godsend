const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/self-referral', require('./routes/selfReferral'));
app.use('/api/incident-reports', require('./routes/incidentReports'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Godsend API',
    version: '1.0.0'
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'OUTSINC API',
    version: '1.0.0',
    description: 'API for OUTSINC - Lived-experience-led support and navigation service',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile',
        updateProfile: 'PUT /api/auth/profile',
        changePassword: 'PUT /api/auth/change-password'
      },
      selfReferral: {
        step1: 'POST /api/self-referral/step1/client-info',
        step2: 'POST /api/self-referral/step2/account-setup',
        step3: 'POST /api/self-referral/step3/consent',
        agencies: 'GET /api/self-referral/agencies'
      },
      incidentReports: {
        submit: 'POST /api/incident-reports/submit',
        types: 'GET /api/incident-reports/types',
        list: 'GET /api/incident-reports',
        get: 'GET /api/incident-reports/:id',
        update: 'PUT /api/incident-reports/:id',
        assign: 'POST /api/incident-reports/:id/assign',
        stats: 'GET /api/incident-reports/stats'
      }
    }
  });
});

// Serve index.html for all non-API routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API documentation available at http://localhost:${PORT}/api`);
});

module.exports = app;
