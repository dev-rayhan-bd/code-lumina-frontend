/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.services";
import { authService } from "@/services/auth.services";
import { toast } from "sonner";
import { Loader2, User, Lock, Camera, ShieldCheck,  KeyRound, EyeOff, Eye, Zap, ShieldAlert } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";


export default function SettingsPage() {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({ queryKey: ["profile"], queryFn: userService.getMyProfile });


  const profileMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully!");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Update failed")
  });







  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const passwordMutation = useMutation({
    mutationFn: async (payload: any) => {

      return await authService.resetPassword({ 
        email: user?.email,
        newPassword: payload.newPassword 
      });
    },
    onSuccess: () => {
      toast.success("Password updated successfully!");
    },
    onError: (err: any) => {
        const errorMsg = err.response?.data?.errorSources?.[0]?.message || "Failed to update password";
        toast.error("Security Error", { description: errorMsg });
    }
  });

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newPass = fd.get("newPassword") as string;
    const confirmPass = fd.get("confirmPassword") as string;

    if (newPass !== confirmPass) return toast.error("New passwords do not match!");
    if (newPass.length < 8) return toast.error("Password must be at least 8 characters");

    passwordMutation.mutate({ newPassword: newPass });
    (e.target as HTMLFormElement).reset();
  };


  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-white tracking-tighter italic">SETTINGS</h1>
        <p className="text-slate-300 text-sm">Manage your researcher profile and security preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-brand-deep border border-white/5 p-1 rounded-xl mb-8">
          <TabsTrigger value="profile" className="text-white data-[state=active]:bg-brand-primary rounded-lg px-8 py-2 font-bold text-xs uppercase tracking-widest">General Profile</TabsTrigger>
          <TabsTrigger value="security" className="text-white data-[state=active]:bg-brand-primary rounded-lg px-8 py-2 font-bold text-xs uppercase tracking-widest">Security & Auth</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-brand-deep border-white/5 shadow-2xl rounded-3xl overflow-hidden text-white">
            <CardHeader className="bg-brand-accent/30 border-b border-white/5">
              <CardTitle>Edit Profile Information</CardTitle>
              <CardDescription>Update your personal and professional details.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const finalFd = new FormData();
                const userData = { firstName: fd.get("firstName"), lastName: fd.get("lastName"), contact: fd.get("contact") };
                finalFd.append("body", JSON.stringify(userData));
                if ((e.currentTarget.image as any).files[0]) finalFd.append("image", (e.currentTarget.image as any).files[0]);
                profileMutation.mutate(finalFd);
              }} className="space-y-6">
                
                {/* Avatar Edit Section */}
                <div className="flex items-center gap-6 pb-4">
                  <div className="relative group">
                    <Avatar className="w-24 h-24 border-2 border-brand-primary/20 ring-4 ring-brand-dark shadow-2xl">
                      <AvatarImage src={user?.image} />
                      <AvatarFallback className="text-4xl font-black">{user?.firstName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Label htmlFor="image" className="absolute bottom-0 right-0 bg-brand-primary text-brand-dark p-2 rounded-full cursor-pointer hover:scale-110 transition-all border-2 border-brand-deep">
                      <Camera size={14} />
                    </Label>
                    <input id="image" name="image" type="file" className="hidden" accept="image/*" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg">{user?.firstName} {user?.lastName}</h4>
                    <p className="text-xs text-slate-500 font-mono">{user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black text-slate-500 ml-1">First Name</Label>
                    <Input name="firstName" defaultValue={user?.firstName} className="bg-brand-dark border-white/5 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black text-slate-500 ml-1">Last Name</Label>
                    <Input name="lastName" defaultValue={user?.lastName} className="bg-brand-dark border-white/5 h-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-slate-500 ml-1">Contact Number</Label>
                  <Input name="contact" defaultValue={user?.contact} className="bg-brand-dark border-white/5 h-12" />
                </div>

                <Button className="w-full h-12 bg-brand-primary text-brand-dark font-black shadow-xl shadow-brand-primary/20" disabled={profileMutation.isPending}>
                  {profileMutation.isPending ? <Loader2 className="animate-spin" /> : "Save Profile Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

<TabsContent value="security" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    {/* মেইন পাসওয়ার্ড চেঞ্জ কার্ড (২ কলাম জুড়ে থাকবে) */}
    <Card className="lg:col-span-2 bg-brand-deep border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] overflow-hidden text-white border-t-4 border-t-brand-primary/50">
      <CardHeader className="bg-brand-accent/20 border-b border-white/5 p-8">
        <div className="flex items-center gap-5">
          <div className="bg-brand-primary/10 p-3 rounded-2xl ring-1 ring-brand-primary/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Lock className="text-brand-primary w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black tracking-tight uppercase italic">Access Security</CardTitle>
            <CardDescription className="text-slate-500 font-medium">Manage your researcher credentials and account protection.</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-10">
        <form 
          onSubmit={handlePasswordChange} 
          className="space-y-8"
        >
          <div className="grid gap-8">
            {/* Current Password Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-[11px] uppercase font-black text-slate-500 tracking-[0.2em] ml-1">Current Authorization</Label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="w-5 h-5 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
                </div>
                <Input 
                  name="oldPassword" 
                  type={showOld ? "text" : "password"} 
                  placeholder="Enter current password" 
                  className="pl-12 h-14 bg-brand-dark/50 border-white/5 focus:border-brand-primary/50 focus:ring-brand-primary/20 text-white rounded-2xl transition-all" 
                />
                <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-4 top-4.5 text-slate-500 hover:text-brand-primary">
                  {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 py-2">
                <Separator className="flex-1 bg-white/5" />
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">New Credentials</span>
                <Separator className="flex-1 bg-white/5" />
            </div>

            {/* New Passwords Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-[11px] uppercase font-black text-slate-500 tracking-[0.2em] ml-1">New Password</Label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
                  </div>
                  <Input 
                    name="newPassword" 
                    type={showNew ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-12 h-14 bg-brand-dark/50 border-white/5 focus:border-brand-primary/50 text-white rounded-2xl transition-all" 
                    required 
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-4.5 text-slate-500">
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[11px] uppercase font-black text-slate-500 tracking-[0.2em] ml-1">Confirm New Password</Label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <ShieldCheck className="w-5 h-5 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
                  </div>
                  <Input 
                    name="confirmPassword" 
                    type={showConfirm ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-12 h-14 bg-brand-dark/50 border-white/5 focus:border-brand-primary/50 text-white rounded-2xl transition-all" 
                    required 
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-4.5 text-slate-500">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Button 
            className="w-full h-14 bg-brand-primary hover:bg-cyan-500 text-brand-dark font-black text-base uppercase tracking-widest shadow-2xl shadow-brand-primary/20 transition-all active:scale-[0.98] rounded-2xl mt-4" 
            disabled={passwordMutation.isPending}
          >
            {passwordMutation.isPending ? <Loader2 className="animate-spin" /> : "Update Credentials"}
          </Button>
        </form>
      </CardContent>
    </Card>


    <div className="space-y-6">
      <Card className="bg-brand-accent/30 border-white/5 rounded-[2rem] p-6 backdrop-blur-sm">
        <h4 className="font-bold text-brand-primary mb-4 flex items-center gap-2">
            <Zap size={16} /> Security Tips
        </h4>
        <ul className="space-y-4">
          {[
            "Use at least 8 characters with numbers.",
            "Include special characters (!@#$%^&*).",
            "Avoid using personal information.",
            "Don't reuse passwords from other apps."
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/50 mt-1.5 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </Card>
      
      <div className="p-6 bg-gradient-to-br from-brand-primary/10 to-transparent border border-brand-primary/10 rounded-[2rem] space-y-3">
          <ShieldAlert className="text-brand-primary w-8 h-8 opacity-50" />
          <h5 className="font-bold text-sm text-white">Advanced Protection</h5>
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Your session is protected by HttpOnly cookies and end-to-end encryption protocols.</p>
      </div>
    </div>
  </div>
</TabsContent>
      </Tabs>
    </div>
  );
}