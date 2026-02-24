import { Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Props {
  onSubmit: (password: string) => void;
  isLoading: boolean;
}

export const ResetStep = ({ onSubmit, isLoading }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form 
      className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300"
      onSubmit={(e) => {
        e.preventDefault();
        const password = new FormData(e.currentTarget).get("password") as string;
        onSubmit(password);
      }}
    >
      <div className="text-center space-y-1">
        <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-2">
          <Lock className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="font-semibold text-lg">Set New Password</h3>
        <p className="text-xs text-slate-500">Choose a strong password for your account.</p>
      </div>

      <div className="space-y-2">
        <Label>New Password</Label>
        <div className="relative group">
          <Input 
            name="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••" 
            required 
            minLength={8}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <Button className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : "Update Password"}
      </Button>
    </form>
  );
};