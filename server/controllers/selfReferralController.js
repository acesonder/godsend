const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Step 1: Submit client information
exports.submitClientInfo = async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      phone,
      email,
      housingStatus,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelationship,
      hasSuicideThoughts,
      hasHomicideThoughts,
      hasSelfHarmThoughts,
      isFleeingViolence,
      preferredContactMethod
    } = req.body;

    await client.query('BEGIN');

    // Create a temporary session ID for this self-referral
    const sessionId = require('crypto').randomBytes(32).toString('hex');
    
    // Store self-referral data temporarily (we'll create user in step 2)
    const result = await client.query(
      `INSERT INTO intake_assessments (client_id, assessment_data, flags)
       VALUES (NULL, $1, $2)
       RETURNING id`,
      [
        JSON.stringify({
          firstName,
          lastName,
          dateOfBirth,
          phone,
          email,
          housingStatus,
          emergencyContactName,
          emergencyContactPhone,
          emergencyContactRelationship,
          preferredContactMethod,
          sessionId
        }),
        JSON.stringify({
          hasSuicideThoughts: hasSuicideThoughts || false,
          hasHomicideThoughts: hasHomicideThoughts || false,
          hasSelfHarmThoughts: hasSelfHarmThoughts || false,
          isFleeingViolence: isFleeingViolence || false,
          isCritical: hasSuicideThoughts || hasHomicideThoughts || isFleeingViolence
        })
      ]
    );

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Client information received',
      sessionId,
      assessmentId: result.rows[0].id,
      nextStep: 'account_setup',
      criticalFlags: {
        isCritical: hasSuicideThoughts || hasHomicideThoughts || isFleeingViolence,
        crisisResources: hasSuicideThoughts || hasHomicideThoughts ? [
          { name: '4 County Crisis', phone: '1-866-995-9933' },
          { name: 'NORS Crisis Line', phone: '1-877-688-6677' },
          { name: 'Emergency', phone: '911' }
        ] : []
      }
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Submit client info error:', error);
    res.status(500).json({ error: 'Failed to submit information', details: error.message });
  } finally {
    client.release();
  }
};

// Step 2: Account setup (username, password, security questions)
exports.setupAccount = async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const {
      sessionId,
      assessmentId,
      username,
      password,
      securityQuestions // Array of {question, answer}
    } = req.body;

    await client.query('BEGIN');

    // Retrieve stored assessment data
    const assessmentResult = await client.query(
      'SELECT assessment_data, flags FROM intake_assessments WHERE id = $1',
      [assessmentId]
    );

    if (assessmentResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Assessment not found' });
    }

    const assessmentData = assessmentResult.rows[0].assessment_data;
    const flags = assessmentResult.rows[0].flags;

    // Verify session ID matches
    if (assessmentData.sessionId !== sessionId) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Invalid session' });
    }

    // Check if username exists
    const existingUser = await client.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    );

    if (existingUser.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const userResult = await client.query(
      `INSERT INTO users (username, email, password_hash, role, first_name, last_name, date_of_birth, phone)
       VALUES ($1, $2, $3, 'client', $4, $5, $6, $7)
       RETURNING id, username, email, role, first_name, last_name`,
      [
        username,
        assessmentData.email,
        passwordHash,
        assessmentData.firstName,
        assessmentData.lastName,
        assessmentData.dateOfBirth,
        assessmentData.phone
      ]
    );

    const user = userResult.rows[0];

    // Create client profile with critical flags
    await client.query(
      `INSERT INTO client_profiles (
        user_id, housing_status, emergency_contact_name, emergency_contact_phone,
        emergency_contact_relationship, has_suicide_thoughts, has_homicide_thoughts,
        has_self_harm_thoughts, is_fleeing_violence, preferred_contact_method
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        user.id,
        assessmentData.housingStatus,
        assessmentData.emergencyContactName,
        assessmentData.emergencyContactPhone,
        assessmentData.emergencyContactRelationship,
        flags.hasSuicideThoughts,
        flags.hasHomicideThoughts,
        flags.hasSelfHarmThoughts,
        flags.isFleeingViolence,
        assessmentData.preferredContactMethod
      ]
    );

    // Store security questions
    if (securityQuestions && Array.isArray(securityQuestions)) {
      for (const sq of securityQuestions) {
        const answerHash = await bcrypt.hash(sq.answer.toLowerCase(), 10);
        await client.query(
          'INSERT INTO security_questions (user_id, question, answer_hash) VALUES ($1, $2, $3)',
          [user.id, sq.question, answerHash]
        );
      }
    }

    // Update assessment with user_id
    await client.query(
      'UPDATE intake_assessments SET client_id = $1 WHERE id = $2',
      [user.id, assessmentId]
    );

    // If critical flags, create a risk assessment
    if (flags.isCritical) {
      await client.query(
        `INSERT INTO risk_assessments (client_id, risk_factors, risk_level, is_critical)
         VALUES ($1, $2, 'critical', true)`,
        [user.id, JSON.stringify(flags)]
      );
    }

    await client.query('COMMIT');

    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      user,
      token,
      nextStep: 'consent_setup',
      criticalFlags: flags.isCritical ? {
        isCritical: true,
        message: 'A worker will reach out to you within 24 hours. If you need immediate help, please contact the crisis resources provided.'
      } : null
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Setup account error:', error);
    res.status(500).json({ error: 'Failed to create account', details: error.message });
  } finally {
    client.release();
  }
};

// Step 3: Setup consent preferences
exports.setupConsent = async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const userId = req.user.id; // From auth middleware
    const { consents } = req.body; // Array of {agencyId, consentScope, specificPermissions}

    await client.query('BEGIN');

    if (consents && Array.isArray(consents)) {
      for (const consent of consents) {
        await client.query(
          `INSERT INTO consents (client_id, agency_id, consent_scope, specific_permissions, is_active)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            userId,
            consent.agencyId,
            consent.consentScope || 'full_name',
            consent.specificPermissions || [],
            consent.isActive !== false // Default to true
          ]
        );
      }
    }

    await client.query('COMMIT');

    res.json({
      message: 'Consent preferences saved successfully',
      nextStep: 'complete',
      redirectTo: '/client/dashboard'
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Setup consent error:', error);
    res.status(500).json({ error: 'Failed to save consent preferences', details: error.message });
  } finally {
    client.release();
  }
};

// Get list of available agencies for consent
exports.getAgencies = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, name, description, service_types FROM agencies WHERE is_active = true ORDER BY name'
    );

    res.json({ agencies: result.rows });

  } catch (error) {
    console.error('Get agencies error:', error);
    res.status(500).json({ error: 'Failed to fetch agencies', details: error.message });
  }
};
