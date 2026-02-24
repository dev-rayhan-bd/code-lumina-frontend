/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginForm({ onForgotPass }: { onForgotPass: () => void }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.data.data.accessToken);
    
      toast.success(res.data.message || "Login Successful! Welcome back.");
      router.push("/dashboard");
    },
    onError: (err: any) => {
  
      const errorMsg = err.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    mutation.mutate(data);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1">
        <div className="relative group">
          <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input name="email" type="email" placeholder="Email Address" className="pl-10 h-11" required />
        </div>
      </div>

      <div className="space-y-1">
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
            className="absolute right-3 top-3 text-slate-400 hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button 
        type="button" 
        onClick={onForgotPass} 
        className="text-xs text-primary font-medium hover:underline float-right"
      >
        Forgot Password?
      </button>

      <Button className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Signing in...</>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}