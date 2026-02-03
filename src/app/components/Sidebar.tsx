"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Przegląd", icon: "◉" },
  { href: "/dashboard/materialy", label: "Materiały", icon: "📚" },
  { href: "/dashboard/zadania", label: "Zadania", icon: "✏️" },
  { href: "/dashboard/lekcje", label: "Umów lekcję", icon: "📅" },
  { href: "/dashboard/tablica", label: "Tablica", icon: "🖌️" },
  { href: "/dashboard/profil", label: "Profil", icon: "👤" },
];

type SidebarProps = {
  adminItems?: { href: string; label: string; icon: string }[];
  userEmail?: string | null;
  userName?: string | null;
};

export function Sidebar({ adminItems = [], userEmail, userName }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const allItems = [...NAV_ITEMS, ...adminItems];

  return (
    <aside
      className={`flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } shrink-0`}
    >
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
        {!collapsed && (
          <Link href="/dashboard" className="font-bold text-slate-800">
            Mathly
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          title={collapsed ? "Rozwiń menu" : "Zwiń menu"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        {allItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-mathly-100 text-mathly-700 font-medium"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      {!collapsed && (userName || userEmail) && (
        <div className="border-t border-slate-200 p-3">
          <p className="truncate text-xs text-slate-500">
            {userName || userEmail}
          </p>
        </div>
      )}
    </aside>
  );
}
