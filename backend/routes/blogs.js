const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { blogs } = require("../data/store");

const router = express.Router();

// GET /api/blogs — list all
router.get("/", (req, res) => {
  const sorted = [...blogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json({ success: true, data: sorted, total: blogs.length });
});

// GET /api/blogs/:id — get single
router.get("/:id", (req, res) => {
  const blog = blogs.find((b) => b.id === req.params.id);
  if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
  res.json({ success: true, data: blog });
});

// POST /api/blogs — create
router.post("/", (req, res) => {
  const {
    title, content, metaDescription, cta,
    niche, keywords, targetAudience, tone, blogType,
  } = req.body;

  if (!title || !niche) {
    return res.status(400).json({ success: false, message: "Title and niche are required" });
  }

  const newBlog = {
    id: uuidv4(),
    title,
    content: content || "",
    metaDescription: metaDescription || "",
    cta: cta || "",
    niche,
    keywords: keywords || "",
    targetAudience: targetAudience || "",
    tone: tone || "Professional",
    blogType: blogType || "SEO",
    status: "draft",
    views: 0,
    trendScore: Math.floor(Math.random() * 40) + 50, // 50–90
    createdAt: new Date().toISOString(),
  };

  blogs.push(newBlog);
  res.status(201).json({ success: true, data: newBlog });
});

// PUT /api/blogs/:id — update
router.put("/:id", (req, res) => {
  const idx = blogs.findIndex((b) => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Blog not found" });

  const allowed = [
    "title", "content", "metaDescription", "cta",
    "niche", "keywords", "targetAudience", "tone", "blogType", "status",
  ];

  allowed.forEach((key) => {
    if (req.body[key] !== undefined) blogs[idx][key] = req.body[key];
  });

  res.json({ success: true, data: blogs[idx] });
});

// DELETE /api/blogs/:id
router.delete("/:id", (req, res) => {
  const idx = blogs.findIndex((b) => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Blog not found" });

  const deleted = blogs.splice(idx, 1)[0];
  res.json({ success: true, data: deleted });
});

// PATCH /api/blogs/:id/publish — toggle publish
router.patch("/:id/publish", (req, res) => {
  const blog = blogs.find((b) => b.id === req.params.id);
  if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

  blog.status = blog.status === "published" ? "draft" : "published";
  if (blog.status === "published" && blog.views === 0) {
    blog.views = Math.floor(Math.random() * 500) + 50;
  }
  res.json({ success: true, data: blog });
});

module.exports = router;
