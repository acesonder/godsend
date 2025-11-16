const db = require('../config/database');

// Submit a question
exports.submitQuestion = async (req, res) => {
  try {
    const { name, email, phone, question } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const result = await db.query(
      `INSERT INTO qa_submissions (name, email, phone, question) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id`,
      [name || null, email || null, phone || null, question.trim()]
    );

    res.json({
      message: 'Question submitted successfully. We will respond via email or phone if you provided contact information.',
      submissionId: result.rows[0].id
    });
  } catch (error) {
    console.error('Error submitting question:', error);
    res.status(500).json({ error: 'Failed to submit question' });
  }
};
