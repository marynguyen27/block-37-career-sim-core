const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const { checkAuth } = require('../middleware/auth');

// new review
router.post('/', checkAuth, async (req, res) => {
  try {
    const { itemId, rating, text } = req.body;

    // user can only leave one review per item
    const existingReview = await prisma.review.findFirst({
      where: {
        itemId,
        userId: req.user.id,
      },
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ error: 'You have already reviewed this item' });
    }

    // new review
    const newReview = await prisma.review.create({
      data: {
        itemId,
        userId: req.user.id,
        rating,
        text,
      },
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// all reviews for an item
router.get('/item/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { itemId: parseInt(itemId) },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews for the item' });
  }
});

// single review
router.get('/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await prisma.review.findUnique({
      where: { id: parseInt(reviewId) },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the review' });
  }
});

// update a review
router.put('/:reviewId', checkAuth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, text } = req.body;

    // Find the review and ensure it belongs to the authenticated user
    const review = await prisma.review.findUnique({
      where: { id: parseInt(reviewId) },
    });

    if (!review || review.userId !== req.user.id) {
      return res
        .status(404)
        .json({ error: 'Review not found or unauthorized' });
    }

    // update the review
    const updatedReview = await prisma.review.update({
      where: { id: parseInt(reviewId) },
      data: { rating, text },
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// delete a review
router.delete('/:reviewId', checkAuth, async (req, res) => {
  try {
    const { reviewId } = req.params;

    // find the review and ensure it belongs to the authenticated user
    const review = await prisma.review.findUnique({
      where: { id: parseInt(reviewId) },
    });

    if (!review || review.userId !== req.user.id) {
      return res
        .status(404)
        .json({ error: 'Review not found or unauthorized' });
    }

    // delete the review
    await prisma.review.delete({
      where: { id: parseInt(reviewId) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router;
