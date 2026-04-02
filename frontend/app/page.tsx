"use client";

import { useEffect, useState } from "react";
import StatsCard from "./components/StatsCard";
import TrendingTopics from "./components/TrendingTopics";
import { dashboardApi } from "./lib/api";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await dashboardApi.getStats();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin w-8 h-8 rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-primary)]"></div>
      </div>
    );
  }

  if (!data) return <div>Failed to load dashboard</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-[var(--color-text-muted)] mt-1">
          Welcome back! Here's what's happening with your AI blogs today.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Blogs"
          value={data.totalBlogs}
          icon="📝"
          trend={{ value: "12%", isUp: true }}
        />
        <StatsCard
          title="Total Views"
          value={data.totalViews.toLocaleString()}
          icon="👁️"
          trend={{ value: "8.4%", isUp: true }}
        />
        <StatsCard
          title="Avg. Trend Score"
          value={data.avgTrendScore}
          icon="🔥"
          trend={data.avgTrendScore > 80 ? { value: "High", isUp: true } : undefined}
        />
        <StatsCard
          title="Published Ratio"
          value={`${data.publishedCount}/${data.totalBlogs}`}
          icon="🚀"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        
        {/* Left Column (Charts/Details) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-6 rounded-xl border border-[var(--color-border)]">
            <h2 className="text-xl font-bold text-white mb-4">Top Performing Blog</h2>
            {data.topBlog ? (
              <div className="bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent p-6 rounded-lg border border-[var(--color-primary)]/20 shadow-inner">
                <span className="inline-block px-3 py-1 bg-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-full text-xs font-bold mb-3">
                  {data.topBlog.niche}
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight mb-2">
                  {data.topBlog.title}
                </h3>
                <div className="flex items-center gap-2 mt-4 text-[var(--color-text-muted)]">
                  <span>👁️</span> <span className="font-semibold text-white">{data.topBlog.views.toLocaleString()}</span> views
                </div>
              </div>
            ) : (
              <p className="text-[var(--color-text-muted)]">No blogs found.</p>
            )}
          </div>
          
          <div className="glass-panel p-6 rounded-xl border border-[var(--color-border)] opacity-80 cursor-not-allowed">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Traffic Analytics</h2>
              <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded">PRO Feature</span>
            </div>
            <div className="h-48 w-full bg-gradient-to-t from-[var(--color-bg-dark)] to-[var(--color-bg-card)] rounded flex items-end justify-between px-4 pb-4 border border-dashed border-[var(--color-border)] gap-2">
              {/* Fake chart bars */}
              {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                <div key={i} className="w-1/6 bg-[var(--color-primary)]/30 rounded-t" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Trending) */}
        <div className="lg:col-span-1">
          <TrendingTopics topics={data.trendingTopics || []} niche={data.topNiche} />
        </div>
      </div>
    </div>
  );
}
