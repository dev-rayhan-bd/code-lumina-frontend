import { Lock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  onSubmit: (password: string) => void;
  isLoading: boolean;
}

export const ResetStep = ({ onSubmit, isLoading }: Props) => (
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
      <Input name="password" type="password" placeholder="••••••••" required minLength={8} />
    </div>
    <Button className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
      {isLoading ? <Loader2 className="animate-spin" /> : "Update Password"}
    </Button>
  </form>
);