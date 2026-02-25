/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, Loader2, Zap, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function SecurityEditCard({ user, mutation }: any) {
  const [showPass, setShowPass] = useState({ old: false, new: false, confirm: false });

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newPass = fd.get("newPassword") as string;
    const confirmPass = fd.get("confirmPassword") as string;

    if (newPass !== confirmPass) return toast.error("Passwords do not match!");
    if (newPass.length < 8) return toast.error("Password must be at least 8 characters");

    mutation.mutate({ newPassword: newPass });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* --- Main Security Card (Left & Center) --- */}
      <Card className="lg:col-span-2 bg-brand-deep border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden text-white border-t-4 border-t-brand-primary/50">
        <CardHeader className="bg-brand-accent/20 border-b border-white/5 p-8">
          <div className="flex items-center gap-5">
            <div className="bg-brand-primary/10 p-3 rounded-2xl ring-1 ring-brand-primary/20">
              <Lock className="text-brand-primary w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-black tracking-tight uppercase italic text-white">Access Security</CardTitle>
              <CardDescription className="text-slate-500 font-medium">Manage your researcher credentials and protection.</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-10">
          <form onSubmit={handlePasswordChange} className="space-y-8">
            {/* Current Password */}
            <div className="space-y-3">
              <Label className="text-[11px] uppercase font-black text-slate-500 tracking-[0.2em] ml-1">Current Authorization</Label>
              <div className="relative group">
                <KeyRound className="absolute left-4 top-4.5 w-5 h-5 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
                <Input 
                  name="oldPassword" 
                  type={showPass.old ? "text" : "password"} 
                  placeholder="Enter current password" 
                  className="pl-12 h-14 bg-brand-dark/50 border-white/5 focus:border-brand-primary/50 text-white rounded-2xl" 
                />
                <button type="button" onClick={() => setShowPass({ ...showPass, old: !showPass.old })} className="absolute right-4 top-4.5 text-slate-500 hover:text-brand-primary">
                  {showPass.old ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 py-2">
                <Separator className="flex-1 bg-white/5" />
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">New Credentials</span>
                <Separator className="flex-1 bg-white/5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-[11px] uppercase font-black text-slate-500 tracking-widest ml-1">New Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-4.5 w-5 h-5 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
                  <Input 
                    name="newPassword" 
                    type={showPass.new ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-12 h-14 bg-brand-dark/50 border-white/5 focus:border-brand-primary/50 text-white rounded-2xl" 
                    required 
                  />
                  <button type="button" onClick={() => setShowPass({ ...showPass, new: !showPass.new })} className="absolute right-4 top-4.5 text-slate-500">
                    {showPass.new ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[11px] uppercase font-black text-slate-500 tracking-widest ml-1">Confirm New</Label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-4.5 w-5 h-5 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
                  <Input 
                    name="confirmPassword" 
                    type={showPass.confirm ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-12 h-14 bg-brand-dark/50 border-white/5 focus:border-brand-primary/50 text-white rounded-2xl" 
                    required 
                  />
                  <button type="button" onClick={() => setShowPass({ ...showPass, confirm: !showPass.confirm })} className="absolute right-4 top-4.5 text-slate-500">
                    {showPass.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <Button 
              className="w-full h-14 bg-brand-primary hover:bg-cyan-500 text-brand-dark font-black text-sm uppercase tracking-widest shadow-2xl shadow-brand-primary/20 rounded-2xl transition-all" 
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Loader2 className="animate-spin" /> : "Update Credentials"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* --- Sidebar Info Cards (Right) --- */}
      <div className="space-y-6">
        <Card className="bg-brand-accent/30 border-white/5 rounded-[2.5rem] p-8 backdrop-blur-sm shadow-xl">
          <h4 className="font-bold text-brand-primary mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
            <Zap size={16} /> Security Tips
          </h4>
          <ul className="space-y-5">
            {[
              "Use at least 8 characters with numbers.",
              "Include special characters (!@#$%^&*).",
              "Avoid using personal information.",
              "Don't reuse passwords from other apps."
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-slate-400 leading-relaxed font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                {tip}
              </li>
            ))}
          </ul>
        </Card>
        
        <div className="p-8 bg-brand-dark border-white/5 rounded-[2.5rem] border border-dashed relative overflow-hidden group hover:border-brand-primary/30 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldAlert size={80} className="text-brand-primary" />
            </div>
            <h5 className="font-bold text-sm text-white mb-2 uppercase tracking-widest">Advanced Protection</h5>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Your session is protected by HttpOnly cookies and end-to-end encryption protocols.</p>
        </div>
      </div>

    </div>
  );
}