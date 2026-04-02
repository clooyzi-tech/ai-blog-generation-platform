"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { blogsApi } from "../../../lib/api";
import React from "react";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [form, setForm] = useState({
    title: "",
    content: "",
    metaDescription: "",
    niche: "",
    keywords: "",
    status: "",
  });

  useEffect(() => {
    async function loadBlog() {
      try {
        const data = await blogsApi.getById(id);
        setForm({
          title: data.title || "",
          content: data.content || "",
          metaDescription: data.metaDescription || "",
          niche: data.niche || "",
          keywords: data.keywords || "",
          status: data.status || "draft",
        });
      } catch (err) {
        alert("Blog not found");
        router.push("/blogs");
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [id, router]);

  const handleUpdate = async () => {
    try {
      setSaving(true);
      await blogsApi.update(id, form);
      router.push("/blogs");
    } catch (err) {
      alert("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20 fade-in">
      <header className="mb-8 flex justify-between items-center border-b border-[var(--color-border)] pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 ml-1">✏️ Edit Blog</h1>
          <p className="text-[var(--color-text-muted)] ml-1">Update existing content directly.</p>
        </div>
        <div className="px-3 py-1 bg-[var(--color-bg-card)] rounded-full text-xs font-semibold border border-[var(--color-border)]">
          ID: {id.split('-')[0]}
        </div>
      </header>

      <div className="space-y-6 glass-panel p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-dark)] shadow-2xl">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Title</label>
          <input
            type="text"
            className="input-field text-lg font-bold"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Niche</label>
            <input
              type="text"
              className="input-field opacity-60 bg-[var(--color-bg-card)] cursor-not-allowed"
              value={form.niche}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Status</label>
            <select
              className="input-field"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Content</label>
          <textarea
            rows={15}
            className="input-field font-mono text-sm leading-relaxed"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Keywords</label>
          <input
            type="text"
            className="input-field"
            value={form.keywords}
            onChange={(e) => setForm({ ...form, keywords: e.target.value })}
          />
        </div>

        <div className="flex gap-4 pt-4 border-t border-[var(--color-border)] justify-end">
          <button
            className="btn-secondary"
            onClick={() => router.push("/blogs")}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            className="btn-primary shadow-lg shadow-indigo-500/20 px-8"
            onClick={handleUpdate}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
