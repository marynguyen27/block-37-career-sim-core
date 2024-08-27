const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Fetch all items' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ message: `Fetch item with id ${req.params.id}` });
});

module.exports = router;
