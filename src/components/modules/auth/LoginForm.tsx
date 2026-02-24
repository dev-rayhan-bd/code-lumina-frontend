/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock } from "lucide-react";

export default function LoginForm({ onForgotPass }: { onForgotPass: () => void }) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.data.data.accessToken);
      toast.success("Welcome back!");
      router.push("/dashboard");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Login failed"),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    mutation.mutate(data);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="relative">
        <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        <Input name="email" type="email" placeholder="Email Address" className="pl-10" required />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        <Input name="password" type="password" placeholder="Password" className="pl-10" required />
      </div>
      <button type="button" onClick={onForgotPass} className="text-xs text-primary hover:underline float-right">Forgot Password?</button>
      <Button className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="animate-spin" /> : "Sign In"}
      </Button>
    </form>
  );
}