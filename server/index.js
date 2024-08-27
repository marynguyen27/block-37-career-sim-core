const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Placeholder User
app.post('/users', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user' });
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
});

// Placeholder Items
app.post('/items', async (req, res) => {
  const { name } = req.body;
  try {
    const item = await prisma.item.create({
      data: { name },
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create item' });
  }
});

app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await prisma.item.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Placeholder Reviews
app.post('/reviews', async (req, res) => {
  const { text, rating, userId, itemId } = req.body;
  try {
    const review = await prisma.review.create({
      data: { text, rating, userId, itemId },
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create review' });
  }
});

app.get('/reviews/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(404).json({ error: 'Review not found' });
  }
});

// Placeholder Comments
app.post('/comments', async (req, res) => {
  const { text, reviewId, userId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: { text, reviewId, userId },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create comment' });
  }
});

app.get('/comments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ error: 'Comment not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
