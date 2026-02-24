/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function RegisterForm({ onRegisterSuccess }: { onRegisterSuccess: (email: string) => void }) {
  const mutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (res, variables: any) => {
 
       const email = JSON.parse(variables.get("body")).email;
       onRegisterSuccess(email);
       toast.success("Registration successful! Check your email.");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Registration failed"),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataUI = new FormData(e.currentTarget);
    
    const userData = {
      firstName: formDataUI.get("firstName"),
      lastName: formDataUI.get("lastName"),
      email: formDataUI.get("email"),
      contact: formDataUI.get("contact"),
      password: formDataUI.get("password"),
    };

    const finalData = new FormData();
    finalData.append("body", JSON.stringify(userData));
    const file = (e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
    if (file) finalData.append("image", file);

    mutation.mutate(finalData);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <Input name="firstName" placeholder="First Name" required />
        <Input name="lastName" placeholder="Last Name" required />
      </div>
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="contact" placeholder="Contact Number" required />
      <Input name="password" type="password" placeholder="Password" required />
      <div>
        <Label className="text-[10px] uppercase font-bold text-slate-400">Profile Picture</Label>
        <Input name="image" type="file" className="text-xs cursor-pointer" accept="image/*" />
      </div>
      <Button className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="animate-spin" /> : "Create Account"}
      </Button>
    </form>
  );
}