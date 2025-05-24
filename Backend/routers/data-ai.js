require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


router.post('/', async (req, res) => {
  let results = []
  async function main() {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: req.body.msg,
      });
      results = [...response.text.split('**')]
    }
    catch (error) {
      if (error.response && error.response.status === 429) {
        return res.status(429).json({ error: "Rate limit or quota exceeded." });
      }

      if (error.message && error.message.includes("Quota exceeded")) {
        return res.status(429).json({ error: "Quota exceeded for today." });
      }

      console.error("Error using Gemini API:", error);
      res.status(500).json({ error: "Something went wrong with Gemini API." });
    }
  }

  await main();
  res.json({ data: results });
});

module.exports = router;