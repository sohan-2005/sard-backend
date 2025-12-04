const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const getRecommendations = async (req, res) => {
  try {
    const { businessType, salesData, inventoryData } = req.body;

    const prompt = `
    You are an expert business analyst.
    Provide 3–5 clear, actionable recommendations based on the following:

    Business Type: ${businessType || "General store"}
    Recent Sales Data: ${JSON.stringify(salesData || {})}
    Inventory Data: ${JSON.stringify(inventoryData || {})}

    Format the output strictly as a JSON array like this:
    [
      { "title": "", "description": "", "priority": "" }
    ]

    Priorities: "high", "medium", or "low".
    Return ONLY valid JSON, nothing else.
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    // Sometimes Gemini wraps JSON in ```json
    const cleaned = reply.replace(/```json|```/g, "").trim();

    const json = JSON.parse(cleaned);

    res.json(json);
  } catch (err) {
    console.error("❌ Gemini Recommendation Error:", err);
    res.status(500).json({
      error: "AI could not generate recommendations"
    });
  }
};

module.exports = { getRecommendations };