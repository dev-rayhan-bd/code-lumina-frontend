"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Code2, History, BarChart3, Settings, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "New Audit", href: "/dashboard/audit", icon: Code2 },
  { label: "History", href: "/dashboard/history", icon: History },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/5 bg-brand-dark flex flex-col h-full relative z-20">
      {/* Brand Logo with Animation */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-brand-primary p-2 rounded-xl transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <ShieldCheck className="text-brand-dark w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white leading-none tracking-tighter">CodeLumina</span>
            <span className="text-[8px] uppercase tracking-[0.3em] font-black text-brand-primary mt-1">AI Auditor</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300",
              pathname === item.href
                ? "bg-brand-primary/10 text-brand-primary shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Research Badge */}
      <div className="p-4 border-t border-white/5">
        <div className="bg-brand-accent/50 p-4 rounded-2xl border border-white/5 space-y-2">
          <p className="text-[10px] uppercase font-black text-brand-primary tracking-widest">Thesis Context</p>
          <p className="text-[11px] text-slate-300 leading-tight">Evaluation of LLM Accuracy & Reliability V1.2</p>
        </div>
      </div>
    </aside>
  );
};