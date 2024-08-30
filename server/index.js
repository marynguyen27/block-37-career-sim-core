const express = require('express');
const { connectDB, client } = require('./db');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();

// Users
app.post('/users', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO users (email) VALUES ($1) RETURNING *',
      [email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user' });
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Items
app.post('/items', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO items (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create item' });
  }
});

app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM items WHERE id = $1', [
      id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Reviews
app.post('/reviews', async (req, res) => {
  const { text, rating, userId, itemId } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO reviews (text, rating, user_id, item_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [text, rating, userId, itemId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create review' });
  }
});

app.get('/reviews/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM reviews WHERE id = $1', [
      id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Comments
app.post('/comments', async (req, res) => {
  const { text, reviewId, userId } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO comments (text, review_id, user_id) VALUES ($1, $2, $3) RETURNING *',
      [text, reviewId, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create comment' });
  }
});

app.get('/comments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM comments WHERE id = $1', [
      id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
