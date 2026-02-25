"use client";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.services";
import { authService } from "@/services/auth.services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, Bell, Loader2 } from "lucide-react";
import Link from "next/link";

export const DashboardHeader = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: userService.getMyProfile,
  });

  return (
    <header className="h-20 border-b border-white/5 bg-brand-dark/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
      <div>
        <h2 className="text-white font-bold tracking-tight">
          {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : `Welcome, ${user?.firstName}`}
        </h2>
        <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">Researcher ID: #{user?._id?.slice(-5)}</p>
      </div>

      <div className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex items-center gap-3 group bg-brand-accent/30 p-1.5 pr-3 rounded-full border border-white/5 hover:border-brand-primary/30 transition-all">
              <Avatar className="h-8 w-8 border border-white/10 shadow-lg">
                <AvatarImage src={user?.image} />
                <AvatarFallback className="bg-brand-primary text-brand-dark font-bold">
                  {user?.firstName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors uppercase tracking-wider">Profile</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-brand-deep border-white/10 text-white w-56 p-2 rounded-xl shadow-2xl">
            <DropdownMenuLabel className="text-slate-400 text-[10px] uppercase font-black">Account Management</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="cursor-pointer flex items-center p-2 rounded-lg hover:bg-white/5">
                <User className="mr-2 h-4 w-4 text-brand-primary" /> Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => authService.logout()} className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer p-2 rounded-lg mt-1">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};