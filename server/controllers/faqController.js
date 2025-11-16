const db = require('../config/database');

// Get all published FAQs
exports.getAllFAQs = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, question, answer, category 
       FROM faq 
       WHERE is_published = TRUE 
       ORDER BY category, order_index, created_at`
    );
    
    // Group by category
    const grouped = result.rows.reduce((acc, faq) => {
      const category = faq.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    }, {});

    res.json({ faqs: grouped });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
};

// Get FAQs by category
exports.getFAQsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const result = await db.query(
      `SELECT id, question, answer, category 
       FROM faq 
       WHERE is_published = TRUE AND category = $1 
       ORDER BY order_index, created_at`,
      [category]
    );

    res.json({ faqs: result.rows });
  } catch (error) {
    console.error('Error fetching FAQs by category:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
};

// Get single FAQ and increment view count
exports.getFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Increment view count
    await db.query(
      'UPDATE faq SET view_count = view_count + 1 WHERE id = $1',
      [id]
    );
    
    const result = await db.query(
      'SELECT id, question, answer, category FROM faq WHERE id = $1 AND is_published = TRUE',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    res.json({ faq: result.rows[0] });
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    res.status(500).json({ error: 'Failed to fetch FAQ' });
  }
};
