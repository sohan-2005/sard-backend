const express = require('express');
const { generateReport } = require('../utils/reportGenerator.js');
const router = express.Router();

router.get('/:format', (req, res) => {
  const format = req.params.format;
  const data = [
    { product: 'Product A', predicted: 850, actual: 820 },
    { product: 'Product B', predicted: 620, actual: 640 },
  ];
  generateReport(format, data, res);
});

module.exports = router;

