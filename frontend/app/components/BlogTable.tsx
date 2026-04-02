"use client";

import Link from "next/link";
import { useState } from "react";
import { blogsApi } from "../lib/api";

export default function BlogTable({ initialData = [] }: { initialData?: any[] }) {
  const [blogs, setBlogs] = useState(initialData);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      setIsUpdating(id);
      await blogsApi.delete(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("Failed to delete");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      setIsUpdating(id);
      const res = await blogsApi.togglePublish(id);
      setBlogs((prev) => prev.map((b) => (b.id === id ? res : b)));
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-[var(--color-text-muted)] text-sm tracking-wider uppercase">
            <th className="py-4 px-6 font-medium">Title</th>
            <th className="py-4 px-6 font-medium">Niche</th>
            <th className="py-4 px-6 font-medium">Status</th>
            <th className="py-4 px-6 font-medium">Views</th>
            <th className="py-4 px-6 font-medium">Trend Score</th>
            <th className="py-4 px-6 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {blogs.map((b) => (
            <tr
              key={b.id}
              className={`hover:bg-white/5 transition-colors ${
                isUpdating === b.id ? "opacity-50" : ""
              }`}
            >
              <td className="py-4 px-6">
                <div className="font-medium text-white max-w-xs truncate" title={b.title}>
                  {b.title}
                </div>
                <div className="text-xs text-[var(--color-text-muted)] mt-1">
                  {new Date(b.createdAt).toLocaleDateString()}
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-medium border border-indigo-500/20">
                  {b.niche}
                </span>
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => handleTogglePublish(b.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                    b.status === "published"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
                  }`}
                  disabled={isUpdating === b.id}
                >
                  {b.status}
                </button>
              </td>
              <td className="py-4 px-6 text-[var(--color-text-muted)]">
                {b.views.toLocaleString()}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{b.trendScore}</span>
                  <div className="w-16 h-1.5 bg-[var(--color-bg-card)] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        b.trendScore > 80 ? "bg-rose-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${b.trendScore}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/blogs/${b.id}/edit`}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors p-1"
                    title="Edit"
                  >
                    ✏️
                  </Link>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="text-[var(--color-text-muted)] hover:text-red-400 transition-colors p-1"
                    title="Delete"
                    disabled={isUpdating === b.id}
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {blogs.length === 0 && (
            <tr>
              <td colSpan={6} className="py-8 text-center text-[var(--color-text-muted)]">
                No blogs found. Go create one!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
