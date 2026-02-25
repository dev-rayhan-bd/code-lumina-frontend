/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, Mail, Phone, Lock, Camera, Eye, EyeOff, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RegisterForm({ onRegisterSuccess }: { onRegisterSuccess: (email: string) => void }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (res, vars: any) => {
      const email = JSON.parse(vars.get("body")).email;
      toast.success("Account created successfully!");
      onRegisterSuccess(email);
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Registration failed"),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("password") !== fd.get("confirmPassword")) return toast.error("Passwords match error");

    const userData = Object.fromEntries(fd);
    const finalFd = new FormData();
    finalFd.append("body", JSON.stringify(userData));
    if (fileRef.current?.files?.[0]) finalFd.append("image", fileRef.current.files[0]);
    mutation.mutate(finalFd);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Premium Avatar Preview */}
      <div className="flex flex-col items-center gap-3 mb-6 group">
        <div className="relative cursor-pointer" onClick={() => fileRef.current?.click()}>
          <div className="absolute -inset-1 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-full blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
          <Avatar className="w-24 h-24 border-2 border-brand-dark relative ring-2 ring-white/10">
            <AvatarImage src={preview || ""} className="object-cover" />
            <AvatarFallback className="bg-brand-accent text-slate-500"><User size={40} /></AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1 bg-brand-primary text-brand-dark p-1.5 rounded-full border-2 border-brand-dark shadow-xl">
            <Camera size={14} />
          </div>
        </div>
        <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
          }
        }} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative group">
          <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
          <Input name="firstName" placeholder="First Name" className="pl-10 h-12 bg-brand-accent/50 border-white/5 focus:border-brand-primary/50" required />
        </div>
        <div className="relative group">
          <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
          <Input name="lastName" placeholder="Last Name" className="pl-10 h-12 bg-brand-accent/50 border-white/5 focus:border-brand-primary/50" required />
        </div>
      </div>

      <div className="relative group">
        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
        <Input name="email" type="email" placeholder="Email" className="pl-10 h-12 bg-brand-accent/50 border-white/5 focus:border-brand-primary/50" required />
      </div>

      <div className="relative group">
        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
        <Input name="contact" placeholder="Phone" className="pl-10 h-12 bg-brand-accent/50 border-white/5 focus:border-brand-primary/50" required />
      </div>

      <div className="relative group">
        <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
        <Input name="password" type={showPass ? "text" : "password"} placeholder="Password" className="pl-10 pr-10 h-12 bg-brand-accent/50 border-white/5 focus:border-brand-primary/50" required />
        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-4 text-slate-500 hover:text-brand-primary">
          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className="relative group">
        <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
        <Input name="confirmPassword" type="password" placeholder="Confirm Password" className="pl-10 h-12 bg-brand-accent/50 border-white/5 focus:border-brand-primary/50" required />
      </div>

      <Button className="w-full h-12 bg-brand-primary hover:bg-cyan-500 text-brand-dark font-black text-lg shadow-lg shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-95" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="animate-spin" /> : "Create Account"}
      </Button>
    </form>
  );
}