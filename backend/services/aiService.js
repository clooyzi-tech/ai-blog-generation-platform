require("dotenv").config();
const OpenAI = require("openai");

const USE_MOCK = !process.env.OPENAI_API_KEY;

let openai;
if (!USE_MOCK) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const mockTopics = {
  Tech: [
    { topic: "Why Rust Is Replacing C++ in Systems Programming", trendScore: 94 },
    { topic: "The Rise of Edge Computing: What Developers Need to Know", trendScore: 89 },
    { topic: "WebAssembly in 2026: Beyond the Browser", trendScore: 85 },
    { topic: "AI-Powered IDEs Are Changing How We Code", trendScore: 91 },
    { topic: "Quantum Computing for Beginners: A 2026 Primer", trendScore: 78 },
  ],
  Startup: [
    { topic: "How to Build a $1M ARR SaaS with No-Code Tools in 2026", trendScore: 96 },
    { topic: "The Lean AI Startup: Ship Your MVP in 7 Days", trendScore: 92 },
    { topic: "Why Solo Founders Are Outperforming VC-Backed Teams", trendScore: 87 },
    { topic: "Micro-SaaS: The Fastest Way to Startup Profitability", trendScore: 83 },
    { topic: "Building in Public: The Growth Hack You're Ignoring", trendScore: 79 },
  ],
  AI: [
    { topic: "Agentic AI: How Autonomous Agents Are Taking Over Task Management", trendScore: 98 },
    { topic: "Prompt Engineering 2.0: Beyond Basic Instructions", trendScore: 93 },
    { topic: "The Hidden Costs of LLM APIs and How to Optimize Them", trendScore: 88 },
    { topic: "Fine-Tuning vs RAG: Which Should You Use for Your AI App?", trendScore: 90 },
    { topic: "AI Safety in 2026: Where Are We Really?", trendScore: 82 },
  ],
  "Real Estate": [
    { topic: "AI Property Valuation Tools That Beat Human Appraisers", trendScore: 86 },
    { topic: "How Short-Term Rentals Are Reshaping Urban Real Estate", trendScore: 81 },
    { topic: "The Proptech Revolution: Smart Buildings in 2026", trendScore: 77 },
    { topic: "Real Estate Crowdfunding: Passive Income for Millennials", trendScore: 83 },
    { topic: "Remote Work's Lasting Impact on Commercial Real Estate", trendScore: 75 },
  ],
  Fitness: [
    { topic: "Wearable AI Coaches: The End of Personal Trainers?", trendScore: 89 },
    { topic: "Cold Plunge Science: What the Data Actually Says", trendScore: 94 },
    { topic: "Minimum Effective Dose: The Lazy Person's Guide to Getting Fit", trendScore: 91 },
    { topic: "Zone 2 Cardio: Why Slow Is the New Fast", trendScore: 86 },
    { topic: "Strength Training After 40: The Science-Backed Blueprint", trendScore: 80 },
  ],
};

const mockBlogContent = (params) => ({
  title:
    params.title ||
    `The Ultimate Guide to ${params.niche} in 2026: ${params.keywords
      ? params.keywords.split(",")[0].trim()
      : "Everything You Need to Know"}`,
  content: `# ${params.title || `The Ultimate Guide to ${params.niche}`}

## Introduction

In today's rapidly evolving ${params.niche} landscape, staying ahead of the curve is more important than ever. This comprehensive guide is designed for **${params.targetAudience || "professionals and enthusiasts"}** who want to gain a competitive edge.

## Why This Matters

The ${params.niche} industry is undergoing a seismic shift. With AI automating repetitive tasks and data-driven insights replacing gut instincts, those who adapt will thrive — and those who don't risk being left behind.

## Key Insights

${params.keywords
  ? params.keywords
      .split(",")
      .map(
        (kw, i) =>
          `### ${i + 1}. ${kw.trim()}\n\nMastering **${kw.trim()}** is no longer optional. Industry leaders are already leveraging this to drive measurable results — and the window of opportunity won't stay open forever.\n`
      )
      .join("\n")
  : `### 1. Embrace the AI Revolution\n\nAI-powered tools are reshaping how we work, create, and grow. The question isn't whether to adopt them — it's how fast.\n\n### 2. Data-Driven Decision Making\n\nEvery successful strategy starts with data. Learn to read the signals that others miss.\n\n### 3. Build Sustainable Systems\n\nShort-term hacks won't cut it. Build systems that compound over time.\n`}

## Actionable Next Steps

1. **Audit your current approach** — identify gaps and opportunities
2. **Invest in the right tools** — don't just follow hype, follow results
3. **Measure relentlessly** — what gets measured gets improved
4. **Community matters** — surround yourself with people already doing it

## Conclusion

The future of ${params.niche} belongs to those who act now. The strategies in this guide are proven, practical, and immediately applicable. Your success story starts today.`,
  metaDescription: `Discover the most effective ${params.niche} strategies for ${params.targetAudience || "professionals"} in 2026. Packed with actionable insights on ${params.keywords ? params.keywords.split(",").slice(0, 2).join(" and ") : "industry best practices"}.`,
  cta: `Ready to take your ${params.niche} game to the next level? Start implementing these strategies today and see the difference within 30 days.`,
});

const mockViralHooks = (title, niche) => [
  `🚨 Stop what you're doing. This ${niche} insight could change everything you thought you knew — and 97% of people have no idea it exists.`,
  `I spent 6 months analyzing the top performers in ${niche}. What I found shocked me. Here's the unfiltered truth nobody talks about...`,
  `"${title}" — Three words that could either make you rich or make you irrelevant. Let me explain why this is the most important thing you'll read this year.`,
];

// ─── AI Functions ──────────────────────────────────────────────────────────

async function generateBlog(params) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1200)); // simulate latency
    return mockBlogContent(params);
  }

  const prompt = `You are an expert blog writer. Generate a complete, high-quality blog post based on:
- Niche: ${params.niche}
- Target Audience: ${params.targetAudience}
- Tone: ${params.tone}
- Blog Type: ${params.blogType}
- Keywords: ${params.keywords}
${params.title ? `- Title: ${params.title}` : ""}

Return a JSON object with exactly these keys:
{
  "title": "...",
  "content": "...(full markdown blog post, at least 600 words)...",
  "metaDescription": "...(max 160 chars)...",
  "cta": "...(compelling call-to-action)..."
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.8,
  });

  return JSON.parse(response.choices[0].message.content);
}

async function getTrendingTopics(niche) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 600));
    return mockTopics[niche] || mockTopics["Tech"];
  }

  const prompt = `List 5 trending blog topics in the "${niche}" niche for 2026. 
Return a JSON array with this structure:
[{ "topic": "...", "trendScore": (integer 0-100) }, ...]
Order by trendScore descending.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const parsed = JSON.parse(response.choices[0].message.content);
  return parsed.topics || parsed;
}

async function generateViralHooks(title, niche) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 800));
    return mockViralHooks(title, niche);
  }

  const prompt = `Generate 3 ultra-viral, attention-grabbing blog intro hooks for:
- Title: "${title}"
- Niche: ${niche}

Each hook should be 1-3 sentences, emotional, and make the reader desperate to continue.
Return a JSON object: { "hooks": ["hook1", "hook2", "hook3"] }`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.9,
  });

  const parsed = JSON.parse(response.choices[0].message.content);
  return parsed.hooks || parsed;
}

module.exports = { generateBlog, getTrendingTopics, generateViralHooks };
