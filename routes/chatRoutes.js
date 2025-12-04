const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'command-r-plus',
        prompt: `User asked: ${message}`,
        max_tokens: 200,
        temperature: 0.7
      })
    });

    const data = await response.json();

    res.json({ reply: data.generations && data.generations[0]?.text?.trim() });
  } catch (error) {
    console.error('❌ Cohere API Error:', error);
    res.status(500).json({ reply: 'Server error while connecting to Cohere API.' });
  }
});

module.exports = router;
