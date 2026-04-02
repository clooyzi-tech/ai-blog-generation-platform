import BlogTable from "../components/BlogTable";
import { blogsApi } from "../lib/api";
import Link from "next/link";

// Server component approach for index fetching
export default async function BlogsPage() {
  // Let's force dynamic rendering for MVP
  // Though typically we'd fetch on server/client properly
  let blogs = [];
  try {
    blogs = await blogsApi.getAll();
  } catch (err) {
    // Silently continue or render error
  }

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Blog Management</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            View, edit, and publish your generated content.
          </p>
        </div>
        
        <Link 
          href="/add-blog" 
          className="btn-primary shadow-lg shadow-indigo-500/20 flex items-center gap-2"
        >
          <span>✨</span> Create New Blog
        </Link>
      </div>

      <div className="glass-panel rounded-xl border border-[var(--color-border)] shadow-xl overflow-hidden">
        {/* We pass initialData to our client component table */}
        <BlogTable initialData={blogs} />
      </div>
    </div>
  );
}
