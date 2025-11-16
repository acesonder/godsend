const db = require('../config/database');

// Get all published courses
exports.getAllCourses = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, title, description, course_type, target_audience, 
              duration_minutes, has_quiz
       FROM courses 
       WHERE is_published = TRUE 
       ORDER BY created_at DESC`
    );

    // Group by type
    const grouped = result.rows.reduce((acc, course) => {
      const type = course.course_type || 'other';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(course);
      return acc;
    }, {});

    res.json({ courses: grouped, all: result.rows });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// Get courses by type
exports.getCoursesByType = async (req, res) => {
  try {
    const { type } = req.params;
    
    const result = await db.query(
      `SELECT id, title, description, course_type, target_audience, 
              duration_minutes, has_quiz
       FROM courses 
       WHERE is_published = TRUE AND course_type = $1 
       ORDER BY created_at DESC`,
      [type]
    );

    res.json({ courses: result.rows, type });
  } catch (error) {
    console.error('Error fetching courses by type:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// Get single course
exports.getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(
      `SELECT id, title, description, course_type, target_audience, 
              content, duration_minutes, has_quiz
       FROM courses 
       WHERE id = $1 AND is_published = TRUE`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ course: result.rows[0] });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
};

// Update course progress
exports.updateProgress = async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const { id } = req.params;
    const { progress_percentage, completed, quiz_score } = req.body;
    const userId = req.user.userId;

    await client.query('BEGIN');

    // Check if course exists
    const courseCheck = await client.query(
      'SELECT id FROM courses WHERE id = $1 AND is_published = TRUE',
      [id]
    );

    if (courseCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if progress record exists
    const existingProgress = await client.query(
      'SELECT id FROM course_progress WHERE user_id = $1 AND course_id = $2',
      [userId, id]
    );

    if (existingProgress.rows.length > 0) {
      // Update existing progress
      const updateQuery = `
        UPDATE course_progress 
        SET progress_percentage = $1,
            completed = $2,
            quiz_score = $3,
            completed_at = CASE WHEN $2 = TRUE THEN CURRENT_TIMESTAMP ELSE completed_at END
        WHERE user_id = $4 AND course_id = $5
        RETURNING *
      `;
      
      const result = await client.query(updateQuery, [
        progress_percentage || 0,
        completed || false,
        quiz_score || null,
        userId,
        id
      ]);

      await client.query('COMMIT');
      res.json({ progress: result.rows[0] });
    } else {
      // Create new progress record
      const insertQuery = `
        INSERT INTO course_progress (user_id, course_id, progress_percentage, completed, quiz_score, completed_at)
        VALUES ($1, $2, $3, $4, $5, CASE WHEN $4 = TRUE THEN CURRENT_TIMESTAMP ELSE NULL END)
        RETURNING *
      `;
      
      const result = await client.query(insertQuery, [
        userId,
        id,
        progress_percentage || 0,
        completed || false,
        quiz_score || null
      ]);

      await client.query('COMMIT');
      res.json({ progress: result.rows[0] });
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating course progress:', error);
    res.status(500).json({ error: 'Failed to update course progress' });
  } finally {
    client.release();
  }
};

// Get user's progress for a course
exports.getMyProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const result = await db.query(
      `SELECT cp.*, c.title, c.course_type
       FROM course_progress cp
       JOIN courses c ON cp.course_id = c.id
       WHERE cp.user_id = $1 AND cp.course_id = $2`,
      [userId, id]
    );

    if (result.rows.length === 0) {
      return res.json({ progress: null });
    }

    res.json({ progress: result.rows[0] });
  } catch (error) {
    console.error('Error fetching course progress:', error);
    res.status(500).json({ error: 'Failed to fetch course progress' });
  }
};
