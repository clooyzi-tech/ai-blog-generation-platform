const express = require("express");
const { generateBlog, getTrendingTopics, generateViralHooks } = require("../services/aiService");

const router = express.Router();

// POST /api/ai/generate — generate blog content
router.post("/generate", async (req, res) => {
  try {
    const { title, niche, targetAudience, tone, blogType, keywords } = req.body;

    if (!niche) {
      return res.status(400).json({ success: false, message: "Niche is required" });
    }

    const result = await generateBlog({ title, niche, targetAudience, tone, blogType, keywords });
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("AI generate error:", err.message);
    res.status(500).json({ success: false, message: "AI generation failed", error: err.message });
  }
});

// GET /api/ai/trending/:niche — get trending topics
router.get("/trending/:niche", async (req, res) => {
  try {
    const { niche } = req.params;
    const topics = await getTrendingTopics(niche);
    res.json({ success: true, data: topics });
  } catch (err) {
    console.error("Trending topics error:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch trending topics", error: err.message });
  }
});

// POST /api/ai/viral-hooks — generate 3 viral hooks
router.post("/viral-hooks", async (req, res) => {
  try {
    const { title, niche } = req.body;

    if (!title || !niche) {
      return res.status(400).json({ success: false, message: "Title and niche are required" });
    }

    const hooks = await generateViralHooks(title, niche);
    res.json({ success: true, data: hooks });
  } catch (err) {
    console.error("Viral hooks error:", err.message);
    res.status(500).json({ success: false, message: "Failed to generate hooks", error: err.message });
  }
});

module.exports = router;
