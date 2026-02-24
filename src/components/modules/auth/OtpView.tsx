import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function OtpView({ email, onBack }: { email: string, onBack: () => void }) {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);

  const verifyMutation = useMutation({
    mutationFn: authService.verifyRegOtp,
    onSuccess: () => {
      toast.success("Verified! You can now login.");
      onBack();
    }
  });

  const resendMutation = useMutation({
    mutationFn: () => authService.resendOtp(email),
    onSuccess: () => { setTimer(60); toast.success("OTP Sent again!"); }
  });

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-sm text-center">Verify <b>{email}</b></p>
      <InputOTP maxLength={6} onComplete={(otp) => verifyMutation.mutate({ email, otp })}>
        <InputOTPGroup>
          {[0,1,2,3,4,5].map(i => <InputOTPSlot key={i} index={i} />)}
        </InputOTPGroup>
      </InputOTP>
      <Button variant="outline" className="w-full" onClick={() => resendMutation.mutate()} disabled={timer > 0}>
        {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
      </Button>
      <Button variant="ghost" onClick={onBack}>Back to Login</Button>
    </div>
  );
}