const express = require('express');
const { getForecastData } = require('../controllers/forecastController.js');
const router = express.Router();

router.get('/', getForecastData);

module.exports = router;

