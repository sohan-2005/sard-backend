const express = require("express");
const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ reply: "Message cannot be empty." });
    }

    const result = await model.generateContent(
      `User asked: ${message}`
    );

    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("❌ Gemini Chat Error:", error);
    res.status(500).json({ reply: "AI service error." });
  }
});

module.exports = router;