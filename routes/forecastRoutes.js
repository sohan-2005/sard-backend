const express = require('express');
const { getForecastData } = require('../controllers/forecastController.js');

const router = express.Router();

// Use POST for AI-based forecasting
router.post('/', getForecastData);

module.exports = router;