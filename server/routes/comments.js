const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.post('/', async (req, res) => {
  try {
    const { text, userId, reviewId } = req.body;
    const newComment = await prisma.comment.create({
      data: {
        text,
        userId,
        reviewId,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

router.get('/review/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { reviewId: parseInt(reviewId, 10) },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id, 10) },
      data: { text },
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.comment.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comment' });
  }
});

module.exports = router;
