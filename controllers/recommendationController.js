// controllers/recommendationController.js
const getRecommendations = (req, res) => {
  const recommendations = [
    {
      title: 'Increase Stock for Product D',
      description: 'AI predicts 35% increase in demand over next 2 weeks based on seasonal patterns.',
      priority: 'high'
    },
    {
      title: 'Optimize Pricing for Product C',
      description: 'Recommended 8% price reduction to match competitor levels.',
      priority: 'medium'
    },
    {
      title: 'Marketing Push for Product E',
      description: 'Increase marketing spend by 20% to boost visibility and conversions.',
      priority: 'medium'
    },
  ];

  res.json(recommendations);
};

module.exports = { getRecommendations };
