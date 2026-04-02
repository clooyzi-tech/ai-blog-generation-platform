const { v4: uuidv4 } = require("uuid");

const blogs = [
  {
    id: uuidv4(),
    title: "10 AI Tools Transforming Startups in 2026",
    content:
      "Artificial intelligence is no longer a luxury for large enterprises. In 2026, startups across the globe are leveraging AI tools to automate workflows, enhance customer experiences, and accelerate growth at an unprecedented pace...",
    metaDescription:
      "Discover the top 10 AI tools that are revolutionizing startup operations in 2026, from automation to customer intelligence.",
    cta: "Start your AI journey today — sign up for a free trial and transform your startup.",
    niche: "Startup",
    keywords: "AI tools, startup growth, automation, 2026",
    targetAudience: "Startup founders and early-stage entrepreneurs",
    tone: "Professional",
    blogType: "Listicle",
    status: "published",
    views: 4821,
    trendScore: 92,
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "How GPT-5 Is Changing Content Marketing Forever",
    content:
      "The launch of GPT-5 has sent shockwaves through the content marketing industry. Brands that once spent thousands on agencies are now producing high-quality, SEO-optimized content at a fraction of the cost...",
    metaDescription:
      "Explore how GPT-5 is disrupting content marketing and what it means for brands, agencies, and creators.",
    cta: "Don't get left behind — leverage AI content tools and stay ahead of the curve.",
    niche: "AI",
    keywords: "GPT-5, content marketing, AI writing, SEO",
    targetAudience: "Marketers and content creators",
    tone: "Viral",
    blogType: "SEO",
    status: "published",
    views: 7340,
    trendScore: 97,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "React vs Next.js in 2026: Which Should You Choose?",
    content:
      "The debate between React and Next.js has evolved significantly in 2026. With Next.js 16 introducing game-changing features like Partial Prerendering and improved Server Components, the choice is more nuanced than ever...",
    metaDescription:
      "A detailed comparison of React vs Next.js in 2026 to help developers choose the right framework for their projects.",
    cta: "Read our full framework guide and make the right choice for your next project.",
    niche: "Tech",
    keywords: "React, Next.js, web development, framework comparison",
    targetAudience: "Web developers and engineering teams",
    tone: "Professional",
    blogType: "Comparison",
    status: "draft",
    views: 0,
    trendScore: 78,
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "Real Estate Investing in the AI Era: Case Study",
    content:
      "Meet Sarah, a 34-year-old real estate investor who used AI-powered analytics to identify undervalued properties in 3 emerging markets. In 18 months, her portfolio grew by 240%...",
    metaDescription:
      "A real-world case study of how AI-driven real estate analytics helped one investor achieve 240% portfolio growth.",
    cta: "Download the AI Real Estate Investment Guide and start making smarter property decisions.",
    niche: "Real Estate",
    keywords: "real estate, AI investing, property analytics, ROI",
    targetAudience: "Real estate investors and property managers",
    tone: "Casual",
    blogType: "Case Study",
    status: "published",
    views: 2156,
    trendScore: 65,
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "5 Fitness Habits Backed by AI Research That Actually Work",
    content:
      "Forget fad diets and generic workout plans. AI analysis of over 10 million fitness journeys has revealed 5 science-backed habits that consistently deliver results, regardless of your body type or starting point...",
    metaDescription:
      "AI-analyzed fitness habits that are proven to work — backed by data from over 10 million health journeys.",
    cta: "Try our AI fitness planner free for 30 days and see the difference data-driven training makes.",
    niche: "Fitness",
    keywords: "fitness habits, AI health, workout tips, science-backed",
    targetAudience: "Health-conscious individuals and fitness beginners",
    tone: "Viral",
    blogType: "Listicle",
    status: "published",
    views: 5983,
    trendScore: 88,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];

module.exports = { blogs };
