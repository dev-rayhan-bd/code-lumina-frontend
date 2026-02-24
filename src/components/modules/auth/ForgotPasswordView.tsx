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

  // (Success & Error Response)
  const forgotMutation = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (res: any) => { 
      setSubStep("otp"); 

      toast.success(res.data?.message || "Verification code sent!"); 
    },
    onError: (err: any) => {
 
      toast.error(err.response?.data?.message || "Failed to send code");
    },
  });

  //  (Success & Error Response)
  const verifyMutation = useMutation({
    mutationFn: (otp: string) => authService.verifyForgotOtp({ email, otp }),
    onSuccess: (res: any) => { 
      setSubStep("reset"); 
      toast.success(res.data?.message || "OTP Verified Successfully!"); 
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Invalid OTP");
    },
  });

  // (Success & Error Response)
const resetMutation = useMutation({
  mutationFn: (newPassword: string) => authService.resetPassword({ email, newPassword }),
  onSuccess: (res: any) => { 
    toast.success(res.data?.message || "Password Updated!"); 
    onBack(); 
  },
  onError: (err: any) => {

    const errorSources = err.response?.data?.errorSources;
    
    if (errorSources && Array.isArray(errorSources)) {

      const combinedMessage = errorSources.map((e: any) => e.message).join(", ");
      toast.error("Security Requirements", {
        description: combinedMessage,
      });
    } else {
 
      toast.error(err.response?.data?.message || "Password reset failed");
    }
  },
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