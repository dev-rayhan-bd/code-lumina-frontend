/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, KeyRound, Timer, ArrowLeft } from "lucide-react";

interface OtpViewProps {
  email: string;
  onBack: () => void;
}

export default function OtpView({ email, onBack }: OtpViewProps) {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const verifyMutation = useMutation({
    mutationFn: authService.verifyRegOtp,
    onSuccess: (res) => {
      toast.success("Account Verified!", { description: "Welcome to CodeLumina AI!" });
 
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Invalid OTP code");
    },
  });


  const resendMutation = useMutation({
    mutationFn: () => authService.resendOtp(email),
    onSuccess: () => {
      setTimer(60);
      toast.success("A new code has been sent to your email.");
    },
  });

  return (
    <div className="flex flex-col items-center space-y-8 py-4 animate-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-2">
          <KeyRound className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold">Verification Required</h3>
        <p className="text-sm text-slate-500">Enter the 6-digit code sent to <br /><span className="font-semibold text-slate-900">{email}</span></p>
      </div>

      <InputOTP 
        maxLength={6} 
        disabled={verifyMutation.isPending}
        onComplete={(otp) => verifyMutation.mutate({ email, otp })}
      >
        <InputOTPGroup className="gap-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <InputOTPSlot key={index} index={index} className="h-12 w-10 border-slate-300 rounded-md text-lg font-bold" />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <div className="w-full space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <Timer size={16} />
          {timer > 0 ? (
            <span>Resend code in <b className="text-slate-900">{timer}s</b></span>
          ) : (
            <button 
              onClick={() => resendMutation.mutate()} 
              disabled={resendMutation.isPending}
              className="text-primary font-bold hover:underline"
            >
              Resend Code Now
            </button>
          )}
        </div>

        <Button variant="ghost" className="w-full text-slate-400" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Change Email
        </Button>
      </div>

      {verifyMutation.isPending && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
           <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}