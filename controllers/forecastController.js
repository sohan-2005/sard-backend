const getForecastData = (req, res) => {
  const forecastData = [
    { product: 'Product A', predicted: 850, actual: 820, trend: 'up' },
    { product: 'Product B', predicted: 620, actual: 640, trend: 'up' },
    { product: 'Product C', predicted: 450, actual: 380, trend: 'down', alert: 'Low stock warning' },
    { product: 'Product D', predicted: 920, actual: 950, trend: 'up' },
    { product: 'Product E', predicted: 340, actual: 290, trend: 'down', alert: 'Performance alert' },
  ];

  res.json(forecastData);
};

module.exports = { getForecastData };
