const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const chatRoutes = require('./routes/chatRoutes');
const bodyParser = require("body-parser");
const forecastRoutes = require('./routes/forecastRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const alertRoutes = require('./routes/alertRoutes');
const statsRoutes = require('./routes/statsRoutes');

// 👇 Gemini SDK (CommonJS import style)
const { GoogleGenerativeAI } = require("@google/generative-ai");

connectDb();
const app = express();

// ---------------- CORS FIX -----------------
app.use(cors({
  origin: [
    "http://localhost:5173",            // Vite local
    "http://localhost:3000",            // React local
    "https://kaleidoscopic-seahorse-f7300f.netlify.app",  // replace after deploy
    "*"                                 // temporary during testing
  ],
  methods: ["GET", "POST"]
}));

app.use(express.json());
app.use(bodyParser.json());

// ---------------- GEMINI SETUP -----------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// --------------- GEMINI ROUTE ------------------
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message cannot be empty." });
    }

    const result = await model.generateContent(message);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ reply: "AI service error." });
  }
});

app.use('/api/legacy-chat', chatRoutes);
app.use("/api/contacts", require("./routes/genRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use('/api/forecast', forecastRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/stats', statsRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Backend is running ✔");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});