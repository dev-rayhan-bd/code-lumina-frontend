/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginForm({ onForgotPass }: { onForgotPass: () => void }) {
  const [showPass, setShowPass] = useState(false);

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      toast.success(res.data.message || "Welcome back!");
      if (typeof window !== "undefined") window.location.href = "/dashboard";
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Login failed"),
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(Object.fromEntries(new FormData(e.currentTarget)));
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="relative group">
        <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
        <Input name="email" type="email" placeholder="Email Address" className="pl-10 h-12 bg-brand-accent border-white/5 text-white" required />
      </div>
      <div className="relative group">
        <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
        <Input name="password" type={showPass ? "text" : "password"} placeholder="Password" className="pl-10 pr-10 h-12 bg-brand-accent border-white/5 text-white" required />
        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 text-slate-500">
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <button type="button" onClick={onForgotPass} className="text-xs text-brand-primary hover:underline float-right">Forgot Password?</button>
      <Button className="w-full h-12 font-bold bg-brand-primary hover:bg-cyan-600 text-white" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
      </Button>
    </form>
  );
}