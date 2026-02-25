/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Timer, ArrowLeft, KeyRound, Loader2 } from "lucide-react";

export default function OtpView({ email, onBack }: { email: string; onBack: () => void }) {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const itv = setInterval(() => setTimer(p => p - 1), 1000);
      return () => clearInterval(itv);
    }
  }, [timer]);

  const verifyMutation = useMutation({
    mutationFn: authService.verifyRegOtp,
    onSuccess: (res) => {
      toast.success(res.data.message || "Account Verified!");

      if (typeof window !== "undefined") window.location.href = "/dashboard";
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Invalid Code"),
  });

  const resendMutation = useMutation({
    mutationFn: () => authService.resendOtp(email),
    onSuccess: () => { setTimer(60); toast.success("OTP Resent!"); }
  });

  return (
    <div className="flex flex-col items-center space-y-8 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative">
        <div className="absolute -inset-4 bg-brand-primary/20 blur-xl rounded-full"></div>
        <KeyRound className="w-14 h-14 text-brand-primary relative z-10" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-white">Verify Your Email</h3>
        <p className="text-sm text-slate-400">We sent a 6-digit code to <br/><span className="text-brand-primary font-medium">{email}</span></p>
      </div>

      <InputOTP maxLength={6} onComplete={(otp) => verifyMutation.mutate({ email, otp })}>
        <InputOTPGroup className="gap-2">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <InputOTPSlot key={i} index={i} className="h-14 w-12 bg-brand-accent/50 border-white/10 text-white font-black text-xl rounded-xl focus:ring-brand-primary" />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <div className="w-full space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm">
          {timer > 0 ? (
            <span className="text-slate-500 flex items-center gap-2 font-medium">
              <Timer size={14} /> Resend in {timer}s
            </span>
          ) : (
            <button onClick={() => resendMutation.mutate()} className="text-brand-primary font-bold hover:underline">
              Resend OTP
            </button>
          )}
        </div>
        <Button variant="ghost" className="w-full text-slate-500 hover:text-white" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2"/> Back to Auth
        </Button>
      </div>

      {verifyMutation.isPending && (
        <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px] flex items-center justify-center rounded-2xl z-20">
          <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
        </div>
      )}
    </div>
  );
}