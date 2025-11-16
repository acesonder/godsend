const db = require('../config/database');

// Submit partner application
exports.submitApplication = async (req, res) => {
  try {
    const {
      organization_name,
      organization_type,
      contact_name,
      contact_email,
      contact_phone,
      message
    } = req.body;

    // Validation
    if (!organization_name || !contact_name || !contact_email) {
      return res.status(400).json({
        error: 'Organization name, contact name, and contact email are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact_email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const result = await db.query(
      `INSERT INTO partner_applications 
       (organization_name, organization_type, contact_name, contact_email, contact_phone, message) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id`,
      [
        organization_name,
        organization_type || 'other',
        contact_name,
        contact_email,
        contact_phone || null,
        message || null
      ]
    );

    res.json({
      message: 'Partnership application submitted successfully. We will review your application and contact you soon.',
      applicationId: result.rows[0].id
    });
  } catch (error) {
    console.error('Error submitting partner application:', error);
    res.status(500).json({ error: 'Failed to submit partner application' });
  }
};
