"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { aiApi, blogsApi } from "../lib/api";

const niches = ["Tech", "Startup", "AI", "Real Estate", "Fitness"];
const tones = ["Professional", "Casual", "Viral"];
const types = ["SEO", "Case Study", "Listicle", "Comparison"];

export default function AddBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hookLoading, setHookLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: "",
    niche: "Tech",
    targetAudience: "",
    tone: "Professional",
    blogType: "SEO",
    keywords: "",
  });

  // Generated Content State
  const [generated, setGenerated] = useState<{
    title: string;
    content: string;
    metaDescription: string;
    cta: string;
    hooks?: string[];
  } | null>(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const data = await aiApi.generate(form);
      setGenerated(data);
    } catch (err) {
      alert("Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateHooks = async () => {
    if (!generated?.title) return alert("Generate a blog first!");
    try {
      setHookLoading(true);
      const hooks = await aiApi.generateHooks(generated.title, form.niche);
      setGenerated((prev) => prev ? { ...prev, hooks } : null);
    } catch (err) {
      alert("Hook generation failed");
    } finally {
      setHookLoading(false);
    }
  };

  const handleSave = async (status: "draft" | "published") => {
    if (!generated) return;
    try {
      setSaving(true);
      const payload = {
        ...form,
        ...generated,
        status,
      };
      await blogsApi.create(payload);
      router.push("/blogs");
    } catch (err) {
      alert("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8 border-b border-[var(--color-border)] pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 ml-1">✨ AI Blog Studio</h1>
        <p className="text-[var(--color-text-muted)] ml-1">
          Configure parameters and let AI draft your next high-performing article.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Col: Setup */}
        <div className="space-y-6 bg-[var(--color-bg-card)]/50 p-6 rounded-xl border border-[var(--color-border)]">
          <h2 className="font-semibold text-lg text-indigo-400 border-b border-[var(--color-border)] pb-2 mb-4">
            Configuration
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--color-text-muted)]">Niche</label>
              <select
                className="input-field cursor-pointer"
                value={form.niche}
                onChange={(e) => setForm({ ...form, niche: e.target.value })}
              >
                {niches.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--color-text-muted)]">Tone</label>
                <select
                  className="input-field cursor-pointer"
                  value={form.tone}
                  onChange={(e) => setForm({ ...form, tone: e.target.value })}
                >
                  {tones.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--color-text-muted)]">Type</label>
                <select
                  className="input-field cursor-pointer"
                  value={form.blogType}
                  onChange={(e) => setForm({ ...form, blogType: e.target.value })}
                >
                  {types.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--color-text-muted)]">Target Audience</label>
              <input
                type="text"
                placeholder="e.g. SaaS Founders, Marketers..."
                className="input-field"
                value={form.targetAudience}
                onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--color-text-muted)]">Keywords (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. ai tools, automation"
                className="input-field"
                value={form.keywords}
                onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--color-text-muted)]">Custom Title (Optional)</label>
              <input
                type="text"
                placeholder="Leave blank for AI to decide"
                className="input-field"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={loading || saving}
              className="w-full btn-primary bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating MAGIC ✨
                </>
              ) : (
                "Generate Content"
              )}
            </button>
          </div>
        </div>

        {/* Right Col: Output */}
        <div className="space-y-6 relative min-h-[500px]">
          {!generated && !loading && (
            <div className="absolute inset-0 border-2 border-dashed border-[var(--color-border)] rounded-xl flex items-center justify-center text-[var(--color-text-muted)] bg-[var(--color-bg-dark)]/50">
              <div className="text-center px-6">
                <span className="text-4xl block mb-4">🪄</span>
                <p>Output will appear here.<br/>Fill out the details on the left to start.</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="absolute inset-x-0 inset-y-0 z-10 glass-panel flex flex-col items-center justify-center gap-4 rounded-xl shadow-2xl border-indigo-500/50">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin shadow-[0_0_15px_rgba(79,70,229,0.5)]"></div>
              <p className="text-indigo-400 font-semibold animate-pulse">Consulting the AI Oracles...</p>
            </div>
          )}

          {generated && (
            <div className="space-y-5 animate-in fade-in duration-500 bg-[var(--color-bg-dark)] p-6 rounded-xl border border-[var(--color-border)] shadow-xl relative z-0">
              <div className="flex justify-between items-center bg-indigo-500/10 p-4 -mt-6 -mx-6 rounded-t-xl mb-6 border-b border-[var(--color-border)]">
                <h3 className="text-indigo-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                  Ready for Review
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--color-text-muted)]">Title</label>
                <input
                  type="text"
                  className="input-field font-bold text-white text-lg bg-[var(--color-bg-card)] border-indigo-500/30"
                  value={generated.title}
                  onChange={(e) => setGenerated({ ...generated, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--color-text-muted)] flex justify-between">
                  <span>Content (Markdown)</span>
                </label>
                <textarea
                  rows={10}
                  className="input-field bg-[var(--color-bg-card)] font-mono text-sm leading-relaxed"
                  value={generated.content}
                  onChange={(e) => setGenerated({ ...generated, content: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--color-text-muted)]">Meta Description</label>
                <textarea
                  rows={2}
                  className="input-field bg-[var(--color-bg-card)] text-sm"
                  value={generated.metaDescription}
                  onChange={(e) => setGenerated({ ...generated, metaDescription: e.target.value })}
                />
              </div>

              {generated.hooks && (
                <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">🔥 Viral Hooks</h4>
                  <ul className="space-y-3">
                    {generated.hooks.map((h, i) => (
                      <li key={i} className="text-sm bg-[var(--color-bg-dark)] p-3 rounded text-purple-100 italic border-l-2 border-purple-500 select-all cursor-pointer hover:bg-white/5 transition">
                        "{h}"
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-[var(--color-border)]">
                <button
                  onClick={handleGenerateHooks}
                  disabled={hookLoading}
                  className="btn-secondary rounded-full bg-[var(--color-bg-card)] text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/10 text-sm whitespace-nowrap"
                >
                  {hookLoading ? "Generating..." : "✨ Generate Viral Hooks"}
                </button>
                <div className="flex-1 flex justify-end gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                  <button
                    className="btn-secondary whitespace-nowrap"
                    onClick={() => handleSave("draft")}
                    disabled={saving}
                  >
                    Save Draft
                  </button>
                  <button
                    className="btn-primary flex-1 sm:flex-none whitespace-nowrap shadow-lg shadow-indigo-500/20"
                    onClick={() => handleSave("published")}
                    disabled={saving}
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
