/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Mail, Lock, KeyRound, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";

export default function ForgotPassView({ onBack }: { onBack: () => void }) {
  const [subStep, setSubStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [showPass, setShowPass] = useState(false);


  const forgotMutation = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (res: any) => { setSubStep("otp"); toast.success(res.data?.message || "OTP Sent!"); },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed"),
  });


  const verifyMutation = useMutation({
    mutationFn: (otp: string) => authService.verifyForgotOtp({ email, otp }),
    onSuccess: () => { setSubStep("reset"); toast.success("OTP Verified!"); },
    onError: () => toast.error("Invalid OTP"),
  });


  const resetMutation = useMutation({
    mutationFn: (data: any) => authService.resetPassword({ email, ...data }),
    onSuccess: () => { toast.success("Password Updated!"); onBack(); },
    onError: (err: any) => {
        const errors = err.response?.data?.errorSources?.map((e:any) => e.message).join(", ");
        toast.error(errors || "Failed to reset");
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* --- Step: Email --- */}
      {subStep === "email" && (
        <div className="space-y-5">
          <div className="text-center">
            <h3 className="text-xl font-bold">Reset Password</h3>
            <p className="text-sm text-slate-400 mt-1">Enter email to receive code</p>
          </div>
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
            <Input 
              type="email" placeholder="Email Address" 
              className="pl-10 h-12 bg-brand-accent/50 border-white/5 text-white" 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button className="w-full h-12 bg-brand-primary font-bold" onClick={() => forgotMutation.mutate(email)} disabled={forgotMutation.isPending}>
            {forgotMutation.isPending ? <Loader2 className="animate-spin" /> : "Send Reset Code"}
          </Button>
        </div>
      )}

      {/* --- Step: OTP --- */}
      {subStep === "otp" && (
        <div className="flex flex-col items-center space-y-6 py-2 text-center">
          <KeyRound className="w-12 h-12 text-brand-primary" />
          <p className="text-sm text-slate-400">Enter code sent to <br/><b className="text-white">{email}</b></p>
          <InputOTP maxLength={6} onComplete={(v) => verifyMutation.mutate(v)}>
            <InputOTPGroup className="gap-2">
              {[0, 1, 2, 3, 4, 5].map(i => <InputOTPSlot key={i} index={i} className="h-12 w-10 bg-brand-accent/50 border-white/5 text-white" />)}
            </InputOTPGroup>
          </InputOTP>
        </div>
      )}

      {/* --- Step: Reset --- */}
      {subStep === "reset" && (
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          resetMutation.mutate({ newPassword: fd.get("newPassword") });
        }}>
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary" />
            <Input 
                name="newPassword" 
                type={showPass ? "text" : "password"} 
                placeholder="New Password" 
                className="pl-10 h-12 bg-brand-accent/50 border-white/5 text-white" 
                required 
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-4 text-slate-500">
                {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          </div>
          <Button className="w-full h-12 bg-brand-primary font-bold" disabled={resetMutation.isPending}>
            {resetMutation.isPending ? <Loader2 className="animate-spin" /> : "Update Password"}
          </Button>
        </form>
      )}

      <Button variant="ghost" className="w-full text-slate-500 hover:text-white" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2"/> Back to Login
      </Button>
    </div>
  );
}