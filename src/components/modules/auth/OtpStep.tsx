import { KeyRound } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface Props {
  email: string;
  onVerify: (otp: string) => void;
  isLoading: boolean;
}

export const OtpStep = ({ email, onVerify, isLoading }: Props) => (
  <div className="flex flex-col items-center space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
    <div className="text-center space-y-1">
      <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-2">
        <KeyRound className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-semibold text-lg">Verify Identity</h3>
      <p className="text-xs text-slate-500">6-digit code sent to <span className="font-medium text-slate-900">{email}</span></p>
    </div>
    <InputOTP maxLength={6} onComplete={onVerify} disabled={isLoading}>
      <InputOTPGroup>
        {[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}
      </InputOTPGroup>
    </InputOTP>
    {isLoading && <p className="text-xs text-primary animate-pulse">Verifying code...</p>}
  </div>
);