const express = require('express');
const knex = require('knex');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'cars up' });
});

module.exports = router;