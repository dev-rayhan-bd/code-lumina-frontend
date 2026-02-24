/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Loader2, User, Mail, Phone, Lock, 
  Camera, Eye, EyeOff, X, ShieldAlert 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface RegisterFormProps {
  onRegisterSuccess: (email: string) => void;
}

export default function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passError, setPassError] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Mutation with Backend Error Handling ---
  const mutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (res, variables: any) => {
  
      toast.success(res.data?.message || "Registration successful!");
      

      const bodyData = JSON.parse(variables.get("body") as string);
      onRegisterSuccess(bodyData.email);
    },
    onError: (err: any) => {

      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      toast.error("Server Error", {
        description: errorMessage,
        icon: <ShieldAlert className="text-destructive  pr-3" />,
      });
    },
  });

  // --- Image Preview Logic ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error("Image must be under 2MB");
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // --- Form Submission Logic ---
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formDataUI = new FormData(e.currentTarget);
  
  const password = formDataUI.get("password") as string;
  const confirmPassword = formDataUI.get("confirmPassword") as string;


  if (password !== confirmPassword) {
    setPassError(true);

    toast.error("Validation Error", {
      description: "Passwords do not match! Please check again.",
    });
    
    return; 
  }


  if (password.length < 8) {
    toast.error("Weak Password", {
      description: "Password must be at least 8 characters long.",
    });
    return;
  }


  setPassError(false);

  const userData = {
    firstName: formDataUI.get("firstName"),
    lastName: formDataUI.get("lastName"),
    email: formDataUI.get("email"),
    contact: formDataUI.get("contact"),
    password: password,
  };

  const finalData = new FormData();
  finalData.append("body", JSON.stringify(userData));
  
  const file = fileInputRef.current?.files?.[0];
  if (file) finalData.append("image", file);


  mutation.mutate(finalData);
};

  return (
    <form onSubmit={onSubmit} className="space-y-4 animate-in fade-in duration-500">
      {/* --- Avatar Upload --- */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="relative group">
          <Avatar className="w-24 h-24 border-4 border-white shadow-xl ring-2 ring-slate-100 group-hover:ring-primary/30 transition-all">
            <AvatarImage src={preview || ""} className="object-cover" />
            <AvatarFallback className="bg-slate-50 text-slate-400">
              <User size={40} />
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Camera size={16} />
          </button>
          {preview && (
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute -top-1 -right-1 bg-destructive text-white p-1 rounded-full shadow-md hover:bg-destructive/80"
            >
              <X size={12} />
            </button>
          )}
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Profile Photo</span>
      </div>

      {/* --- Inputs --- */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="relative group">
            <User className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input name="firstName" placeholder="First Name" className="pl-10 h-11 bg-slate-50/50" required />
          </div>
        </div>
        <div className="space-y-1">
          <div className="relative group">
            <User className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input name="lastName" placeholder="Last Name" className="pl-10 h-11 bg-slate-50/50" required />
          </div>
        </div>
      </div>

      <div className="relative group">
        <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        <Input name="email" type="email" placeholder="Email Address" className="pl-10 h-11 bg-slate-50/50" required />
      </div>

      <div className="relative group">
        <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        <Input name="contact" placeholder="Phone Number" className="pl-10 h-11 bg-slate-50/50" required />
      </div>

      {/* Password */}
      <div className="relative group">
        <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        <Input 
          name="password" 
          type={showPass ? "text" : "password"} 
          placeholder="Password" 
          className="pl-10 pr-10 h-11 bg-slate-50/50" 
          required 
        />
        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-slate-400 hover:text-primary transition-colors">
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative group">
        <Lock className={cn("absolute left-3 top-3 w-4 h-4 text-slate-400 transition-colors", passError && "text-destructive")} />
        <Input 
          name="confirmPassword" 
          type={showConfirmPass ? "text" : "password"} 
          placeholder="Confirm Password" 
          className={cn(
            "pl-10 pr-10 h-11 bg-slate-50/50 transition-all",
            passError && "border-destructive focus-visible:ring-destructive"
          )} 
          required 
          onChange={(e) => {
            const p = (e.target.form?.elements.namedItem("password") as HTMLInputElement).value;
            setPassError(e.target.value !== p && e.target.value.length > 0);
          }}
        />
        <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3 top-3 text-slate-400">
          {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <Button 
        className="w-full h-12 text-base font-bold shadow-xl shadow-primary/20 hover:translate-y-[-2px] active:translate-y-[0px] transition-all" 
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying Details...</>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}