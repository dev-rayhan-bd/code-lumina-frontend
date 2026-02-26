"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.services";
import { 
  LayoutDashboard, Code2, History, BarChart3, 
  ShieldCheck, UserCircle, Loader2 
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const pathname = usePathname();
  const { data: user, isLoading } = useQuery({ 
    queryKey: ["profile"], 
    queryFn: userService.getMyProfile 
  });


  const menuItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "New Audit", href: "/dashboard/audit", icon: Code2 },
  ];


  if (user?.role === "superAdmin") {
    menuItems.push({ label: "Global History", href: "/dashboard/history", icon: History });
  }

  menuItems.push({ label: "My History", href: "/dashboard/myhistory", icon: UserCircle });


  if (user?.role === "superAdmin") {
    menuItems.push({ label: "Research Analytics", href: "/dashboard/analytics", icon: BarChart3 });
  }

  return (
    <aside className="w-64 border-r border-white/5 bg-brand-dark flex flex-col h-full relative z-20">
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-brand-primary p-2 rounded-xl transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 shadow-lg">
            <ShieldCheck className="text-brand-dark w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-white tracking-tighter">CodeLumina</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {isLoading ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-primary" /></div>
        ) : (
          menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                pathname === item.href
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))
        )}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="bg-brand-accent/50 p-4 rounded-2xl border border-white/5">
          <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">
            Logged as: {user?.role === "superAdmin" ? "Researcher" : "Developer"}
          </p>
        </div>
      </div>
    </aside>
  );
};