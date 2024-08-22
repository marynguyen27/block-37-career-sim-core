const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/items', require('../src/routes/items'));
app.use('/api/users', require('../src/routes/users'));

app.get('/', (req, res) => {
  res.send('Bakery API');
});

module.exports = app;
