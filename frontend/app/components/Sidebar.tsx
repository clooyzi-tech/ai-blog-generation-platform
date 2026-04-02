"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "Dashboard", href: "/", icon: "📊" },
    { label: "Blog List", href: "/blogs", icon: "📝" },
    { label: "Add Blog", href: "/add-blog", icon: "✨" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 glass-panel rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`glass-panel border-r border-[var(--color-border)] w-64 h-full flex flex-col transition-transform duration-300 z-40 fixed md:relative ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-[var(--color-primary)] bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">⚡</span> BlogAI
          </h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium border border-[var(--color-primary)]/20"
                    : "text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text-main)]"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 m-4 rounded-xl bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-bg-dark)] border border-[var(--color-border)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-[var(--color-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h4 className="text-sm font-semibold text-[var(--color-text-main)] mb-1">PRO Plan</h4>
          <p className="text-xs text-[var(--color-text-muted)] mb-3">12/50 AI Generations</p>
          <div className="w-full h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--color-primary)] w-[24%]" />
          </div>
        </div>
      </aside>
    </>
  );
}
