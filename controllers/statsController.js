const getStats = (req, res) => {
  const stats = {
    totalRevenue: 125450,
    revenueChange: '+12.5%',
    predictionAccuracy: '98.7%',
    activeAlerts: 3,
    productsTracked: 248
  };

  res.json(stats);
};

module.exports = { getStats };