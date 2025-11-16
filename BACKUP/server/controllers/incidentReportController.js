const db = require('../config/database');

// Submit public/business incident report
exports.submitReport = async (req, res) => {
  try {
    const {
      reporterName,
      reporterEmail,
      reporterPhone,
      reportType,
      location,
      description,
      latitude,
      longitude
    } = req.body;

    // Validate required fields
    if (!reportType || !location || !description) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['reportType', 'location', 'description']
      });
    }

    const result = await db.query(
      `INSERT INTO incident_reports (
        reporter_name, reporter_email, reporter_phone, report_type,
        location, description, latitude, longitude, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'new')
      RETURNING id, report_type, location, status, created_at`,
      [reporterName, reporterEmail, reporterPhone, reportType, location, description, latitude, longitude]
    );

    const report = result.rows[0];

    res.status(201).json({
      message: 'Report submitted successfully',
      report,
      confirmationMessage: 'Thank you for your report. We have received it and will review it shortly. You will receive an email confirmation if you provided an email address.'
    });

  } catch (error) {
    console.error('Submit report error:', error);
    res.status(500).json({ error: 'Failed to submit report', details: error.message });
  }
};

// Get report types for form dropdown
exports.getReportTypes = (req, res) => {
  const reportTypes = [
    {
      value: 'harm_reduction_litter',
      label: 'Harm Reduction Litter (needles, supplies)',
      description: 'Used harm reduction supplies found in public areas'
    },
    {
      value: 'welfare_check',
      label: 'Welfare Check',
      description: 'Concern about someone\'s safety or wellbeing'
    },
    {
      value: 'abandoned_belongings',
      label: 'Abandoned Belongings',
      description: 'Personal items or property left behind'
    },
    {
      value: 'illegal_tent',
      label: 'Encampment/Tent',
      description: 'Tent or encampment blocking space or on private property'
    },
    {
      value: 'safety_concern',
      label: 'Safety Concern',
      description: 'Person or situation causing safety concerns'
    },
    {
      value: 'cleanup',
      label: 'Cleanup Request',
      description: 'Area needing cleanup or maintenance'
    },
    {
      value: 'other',
      label: 'Other',
      description: 'Other concerns not listed above'
    }
  ];

  res.json({ reportTypes });
};

// Get all reports (worker/admin only)
exports.getAllReports = async (req, res) => {
  try {
    const { status, reportType, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT ir.*, 
             u.first_name || ' ' || u.last_name as assigned_worker_name
      FROM incident_reports ir
      LEFT JOIN users u ON ir.assigned_worker_id = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (status) {
      query += ` AND ir.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (reportType) {
      query += ` AND ir.report_type = $${paramCount}`;
      params.push(reportType);
      paramCount++;
    }

    query += ` ORDER BY ir.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM incident_reports WHERE 1=1';
    const countParams = [];
    let countParamIndex = 1;

    if (status) {
      countQuery += ` AND status = $${countParamIndex}`;
      countParams.push(status);
      countParamIndex++;
    }

    if (reportType) {
      countQuery += ` AND report_type = $${countParamIndex}`;
      countParams.push(reportType);
    }

    const countResult = await db.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      reports: result.rows,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (parseInt(offset) + parseInt(limit)) < total
      }
    });

  } catch (error) {
    console.error('Get all reports error:', error);
    res.status(500).json({ error: 'Failed to fetch reports', details: error.message });
  }
};

// Get single report by ID
exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `SELECT ir.*, 
              u.first_name || ' ' || u.last_name as assigned_worker_name,
              u.email as assigned_worker_email
       FROM incident_reports ir
       LEFT JOIN users u ON ir.assigned_worker_id = u.id
       WHERE ir.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json({ report: result.rows[0] });

  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ error: 'Failed to fetch report', details: error.message });
  }
};

// Update report (worker/admin only)
exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedWorkerId, resolutionNotes } = req.body;
    const workerId = req.user.id;

    const updates = [];
    const params = [];
    let paramCount = 1;

    if (status) {
      updates.push(`status = $${paramCount}`);
      params.push(status);
      paramCount++;
    }

    if (assignedWorkerId !== undefined) {
      updates.push(`assigned_worker_id = $${paramCount}`);
      params.push(assignedWorkerId || null);
      paramCount++;
    }

    if (resolutionNotes) {
      updates.push(`resolution_notes = $${paramCount}`);
      params.push(resolutionNotes);
      paramCount++;
    }

    if (status === 'completed' || status === 'closed') {
      updates.push(`resolved_at = CURRENT_TIMESTAMP`);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    params.push(id);

    const query = `
      UPDATE incident_reports
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await db.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json({
      message: 'Report updated successfully',
      report: result.rows[0]
    });

  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ error: 'Failed to update report', details: error.message });
  }
};

// Assign report to worker (admin only)
exports.assignReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { workerId } = req.body;

    const result = await db.query(
      `UPDATE incident_reports
       SET assigned_worker_id = $1, status = 'in_progress', updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [workerId, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json({
      message: 'Report assigned successfully',
      report: result.rows[0]
    });

  } catch (error) {
    console.error('Assign report error:', error);
    res.status(500).json({ error: 'Failed to assign report', details: error.message });
  }
};

// Get report statistics (admin only)
exports.getReportStats = async (req, res) => {
  try {
    const stats = await db.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'new') as new_reports,
        COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress,
        COUNT(*) FILTER (WHERE status = 'completed') as completed,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as last_week,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as last_month
      FROM incident_reports
    `);

    const typeStats = await db.query(`
      SELECT report_type, COUNT(*) as count
      FROM incident_reports
      GROUP BY report_type
      ORDER BY count DESC
    `);

    res.json({
      overview: stats.rows[0],
      byType: typeStats.rows
    });

  } catch (error) {
    console.error('Get report stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics', details: error.message });
  }
};
