// controllers/forecastController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const getForecastData = async (req, res) => {
  try {
    const { salesData, daysAhead } = req.body;

    const prompt = `
    You are a business forecasting expert.

    Generate predicted performance for products based on:
    Sales Data: ${JSON.stringify(salesData || {})}
    Forecast Range: ${daysAhead || 7} days

    For each product, output:
    - product (string)
    - predicted (number)
    - actual (number or null)
    - trend ("up" or "down")
    - alert (string or null)

    Return ONLY valid JSON in this exact format:
    [
      { "product": "", "predicted": 0, "actual": 0, "trend": "", "alert": "" }
    ]
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    // Clean Gemini markdown if any
    const cleaned = reply.replace(/```json|```/g, "").trim();

    const json = JSON.parse(cleaned);

    res.json(json);
  } catch (err) {
    console.error("❌ Forecast AI Error:", err);
    res.status(500).json({
      error: "AI could not generate forecast data"
    });
  }
};

module.exports = { getForecastData };