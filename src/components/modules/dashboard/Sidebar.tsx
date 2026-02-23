"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Code2, 
  History, 
  BarChart3, 
  Settings, 
  ShieldCheck,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "New Audit", href: "/dashboard/audit", icon: Code2 },
  { label: "History", href: "/dashboard/history", icon: History },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white flex flex-col h-full transition-all duration-300">
      {/* Brand Logo */}
      <div className="p-6 flex items-center gap-3 border-b">
        <div className="bg-primary p-1.5 rounded-lg">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-xl tracking-tight">CodeLumina</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Thesis Badge at Bottom */}
      <div className="p-4 border-t">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Research Mode</p>
          <p className="text-xs text-slate-600 font-medium">Evaluation: V1.2</p>
        </div>
      </div>
    </aside>
  );
};