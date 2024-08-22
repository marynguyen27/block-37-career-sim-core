const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get all items');
});

router.get('/:id', (req, res) => {
  res.send(`Get item with ID ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send('Create a new item');
});

module.exports = router;
