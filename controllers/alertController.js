const getAlerts = (req, res) => {
  const alerts = [
    { title: 'Low Stock - Product C', type: 'critical', details: 'Current stock: 45 units. Reorder recommended.' },
    { title: 'Performance Drop - Product E', type: 'warning', details: '15% below forecast. Review pricing.' },
    { title: 'High Demand - Product D', type: 'info', details: 'Exceeding forecast by 20%. Consider increasing inventory.' }
  ];

  res.json(alerts);
};

module.exports = { getAlerts };