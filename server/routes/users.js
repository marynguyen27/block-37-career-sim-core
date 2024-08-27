const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
  res.send('User signup');
});

router.post('/login', (req, res) => {
  res.send('User login');
});

module.exports = router;
