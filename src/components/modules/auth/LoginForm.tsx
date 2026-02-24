/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginForm({ onForgotPass }: { onForgotPass: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      toast.success(res.data?.message || "Login Successful!");
      
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Invalid credentials");
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    mutation.mutate(data);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 animate-in fade-in duration-500">
      <div className="relative group">
        <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        <Input name="email" type="email" placeholder="Email Address" className="pl-10 h-11" required />
      </div>

      <div className="relative group">
        <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        <Input 
          name="password" 
          type={showPassword ? "text" : "password"} 
          placeholder="Password" 
          className="pl-10 pr-10 h-11" 
          required 
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-slate-400 hover:text-primary"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <button type="button" onClick={onForgotPass} className="text-xs text-primary font-medium hover:underline float-right">
        Forgot Password?
      </button>

      <Button className="w-full h-11 font-bold shadow-lg shadow-primary/20" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
      </Button>
    </form>
  );
}