const express = require("express");
const { blogs } = require("../data/store");
const { getTrendingTopics } = require("../services/aiService");

const router = express.Router();

// GET /api/dashboard/stats
router.get("/stats", async (req, res) => {
  try {
    const totalBlogs = blogs.length;
    const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);
    const publishedCount = blogs.filter((b) => b.status === "published").length;
    const draftCount = blogs.filter((b) => b.status === "draft").length;

    const topBlog = [...blogs].sort((a, b) => b.views - a.views)[0] || null;

    const avgTrendScore =
      blogs.length > 0
        ? Math.round(blogs.reduce((sum, b) => sum + b.trendScore, 0) / blogs.length)
        : 0;

    // Get trending topics for the most used niche
    const nicheCounts = blogs.reduce((acc, b) => {
      acc[b.niche] = (acc[b.niche] || 0) + 1;
      return acc;
    }, {});

    const topNiche =
      Object.entries(nicheCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "AI";

    const trendingTopics = await getTrendingTopics(topNiche);

    res.json({
      success: true,
      data: {
        totalBlogs,
        totalViews,
        publishedCount,
        draftCount,
        avgTrendScore,
        topBlog: topBlog ? { title: topBlog.title, views: topBlog.views, niche: topBlog.niche } : null,
        topNiche,
        trendingTopics,
      },
    });
  } catch (err) {
    console.error("Dashboard stats error:", err.message);
    res.status(500).json({ success: false, message: "Failed to load dashboard stats" });
  }
});

module.exports = router;
