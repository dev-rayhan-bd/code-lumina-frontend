import { Mail, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  email: string;
  setEmail: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const EmailStep = ({ email, setEmail, onSubmit, isLoading }: Props) => (
  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
    <div className="text-center space-y-1">
      <h3 className="font-semibold text-lg">Forgot Password?</h3>
      <p className="text-xs text-slate-500">Enter your email to receive reset instructions.</p>
    </div>
    <div className="space-y-2">
      <Label>Email Address</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        <Input 
          type="email" 
          placeholder="name@example.com" 
          className="pl-10" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
    <Button className="w-full" onClick={onSubmit} disabled={isLoading || !email}>
      {isLoading ? <Loader2 className="animate-spin" /> : "Send Verification Code"}
    </Button>
  </div>
);