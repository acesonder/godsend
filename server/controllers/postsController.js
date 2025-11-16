const db = require('../config/database');

// Get all published posts
exports.getAllPosts = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    
    const result = await db.query(
      `SELECT p.id, p.title, p.content, p.post_type, p.published_at,
              u.first_name, u.last_name
       FROM posts p
       LEFT JOIN users u ON p.author_id = u.id
       WHERE p.is_published = TRUE
       ORDER BY p.published_at DESC
       LIMIT $1 OFFSET $2`,
      [parseInt(limit), parseInt(offset)]
    );

    // Get total count
    const countResult = await db.query(
      'SELECT COUNT(*) FROM posts WHERE is_published = TRUE'
    );

    res.json({
      posts: result.rows,
      total: parseInt(countResult.rows[0].count),
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get posts by type
exports.getPostsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { limit = 10, offset = 0 } = req.query;
    
    const result = await db.query(
      `SELECT p.id, p.title, p.content, p.post_type, p.published_at,
              u.first_name, u.last_name
       FROM posts p
       LEFT JOIN users u ON p.author_id = u.id
       WHERE p.is_published = TRUE AND p.post_type = $1
       ORDER BY p.published_at DESC
       LIMIT $2 OFFSET $3`,
      [type, parseInt(limit), parseInt(offset)]
    );

    // Get total count for this type
    const countResult = await db.query(
      'SELECT COUNT(*) FROM posts WHERE is_published = TRUE AND post_type = $1',
      [type]
    );

    res.json({
      posts: result.rows,
      total: parseInt(countResult.rows[0].count),
      limit: parseInt(limit),
      offset: parseInt(offset),
      type
    });
  } catch (error) {
    console.error('Error fetching posts by type:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(
      `SELECT p.id, p.title, p.content, p.post_type, p.published_at,
              u.first_name, u.last_name
       FROM posts p
       LEFT JOIN users u ON p.author_id = u.id
       WHERE p.id = $1 AND p.is_published = TRUE`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post: result.rows[0] });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};
