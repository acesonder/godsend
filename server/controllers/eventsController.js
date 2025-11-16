const db = require('../config/database');

// Get all upcoming public events
exports.getUpcomingEvents = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT e.id, e.title, e.description, e.event_type, e.location, 
              e.start_datetime, e.end_datetime, e.capacity, e.registration_required,
              COUNT(er.id) as registered_count
       FROM events e
       LEFT JOIN event_registrations er ON e.id = er.event_id AND er.status = 'registered'
       WHERE e.is_public = TRUE 
         AND e.start_datetime >= NOW()
       GROUP BY e.id
       ORDER BY e.start_datetime`
    );

    res.json({ events: result.rows });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get single event
exports.getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(
      `SELECT e.id, e.title, e.description, e.event_type, e.location, 
              e.start_datetime, e.end_datetime, e.capacity, e.registration_required,
              COUNT(er.id) as registered_count
       FROM events e
       LEFT JOIN event_registrations er ON e.id = er.event_id AND er.status = 'registered'
       WHERE e.id = $1 AND e.is_public = TRUE
       GROUP BY e.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ event: result.rows[0] });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Register for an event
exports.registerForEvent = async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const { id } = req.params;
    const { name, email, phone, user_id } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    await client.query('BEGIN');

    // Check if event exists and has capacity
    const eventResult = await client.query(
      `SELECT e.id, e.capacity, e.registration_required,
              COUNT(er.id) as registered_count
       FROM events e
       LEFT JOIN event_registrations er ON e.id = er.event_id AND er.status = 'registered'
       WHERE e.id = $1 AND e.is_public = TRUE AND e.start_datetime > NOW()
       GROUP BY e.id`,
      [id]
    );

    if (eventResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Event not found or has already started' });
    }

    const event = eventResult.rows[0];
    
    if (event.capacity && parseInt(event.registered_count) >= event.capacity) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Event is full' });
    }

    // Check if already registered
    const existingRegistration = await client.query(
      'SELECT id FROM event_registrations WHERE event_id = $1 AND email = $2 AND status = $3',
      [id, email, 'registered']
    );

    if (existingRegistration.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    // Create registration
    const result = await client.query(
      `INSERT INTO event_registrations (event_id, user_id, name, email, phone) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id`,
      [id, user_id || null, name, email, phone || null]
    );

    await client.query('COMMIT');

    res.json({
      message: 'Successfully registered for event',
      registrationId: result.rows[0].id
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error registering for event:', error);
    res.status(500).json({ error: 'Failed to register for event' });
  } finally {
    client.release();
  }
};
