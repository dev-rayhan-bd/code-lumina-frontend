/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.services";
import { authService } from "@/services/auth.services";
import { toast } from "sonner";

import { Zap, ShieldAlert } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProfileEditCard from "@/components/modules/dashboard/setting/ProfileEditCard";
import SecurityEditCard from "@/components/modules/dashboard/setting/SecurityEditCard";

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({ queryKey: ["profile"], queryFn: userService.getMyProfile });
  const [showPass, setShowPass] = useState({ old: false, new: false, confirm: false });

  const profileMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully!");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Update failed")
  });

  const passwordMutation = useMutation({
    mutationFn: async (payload: any) => {
      return await authService.resetPassword({ email: user?.email, ...payload });
    },
    onSuccess: () => toast.success("Password updated!"),
    onError: (err: any) => toast.error(err.response?.data?.message || "Change failed")
  });

  return (
   <div className="w-full max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20 px-2 sm:px-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-white tracking-tighter italic uppercase">Settings</h1>
        <p className="text-slate-300 text-sm font-medium">Manage your researcher profile and security protocols.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
       
        <TabsList className="bg-brand-deep border border-white/5 p-1.5 rounded-[1.2rem] mb-10 w-fit">
          <TabsTrigger value="profile" className="text-white data-[state=active]:bg-brand-primary rounded-[1rem] px-10 py-2.5 font-bold text-xs uppercase tracking-widest transition-all">General Profile</TabsTrigger>
          <TabsTrigger value="security" className="text-white data-[state=active]:bg-brand-primary rounded-[1rem] px-10 py-2.5 font-bold text-xs uppercase tracking-widest transition-all">Security & Auth</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileEditCard user={user} mutation={profileMutation} />
        </TabsContent>

        <TabsContent value="security">
    
          <SecurityEditCard mutation={passwordMutation} user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}