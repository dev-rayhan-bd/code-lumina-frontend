/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { EmailStep } from "./EmailStep";
import { OtpStep } from "./OtpStep";
import { ResetStep } from "./ResetStep";

export default function ForgotPassView({ onBack }: { onBack: () => void }) {
  const [subStep, setSubStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");

  const forgotMutation = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => { setSubStep("otp"); toast.success("Code sent!"); },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to send code"),
  });

  const verifyMutation = useMutation({
    mutationFn: (otp: string) => authService.verifyForgotOtp({ email, otp }),
    onSuccess: () => { setSubStep("reset"); toast.success("OTP Verified!"); },
    onError: () => toast.error("Invalid OTP"),
  });

  const resetMutation = useMutation({
    mutationFn: (newPassword: string) => authService.resetPassword({ email, newPassword }),
    onSuccess: () => { toast.success("Password Updated!"); onBack(); },
    onError: () => toast.error("Reset failed"),
  });

  return (
    <div className="space-y-6 pt-2">
      {subStep === "email" && (
        <EmailStep 
          email={email} 
          setEmail={setEmail} 
          onSubmit={() => forgotMutation.mutate(email)} 
          isLoading={forgotMutation.isPending} 
        />
      )}

      {subStep === "otp" && (
        <OtpStep 
          email={email} 
          onVerify={(otp) => verifyMutation.mutate(otp)} 
          isLoading={verifyMutation.isPending} 
        />
      )}

      {subStep === "reset" && (
        <ResetStep 
          onSubmit={(pass) => resetMutation.mutate(pass)} 
          isLoading={resetMutation.isPending} 
        />
      )}

      <Button variant="ghost" className="w-full text-slate-500" onClick={onBack}>
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Login
      </Button>
    </div>
  );
}