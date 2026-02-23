/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.services";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, Mail, Lock, User, Phone } from "lucide-react";

type AuthStep = "login-reg" | "otp" | "forgot-password" | "reset-password";

export default function AuthPage() {
  const [step, setStep] = useState<AuthStep>("login-reg");
  const [tempEmail, setTempEmail] = useState("");
  const router = useRouter();

  // --- Mutations ---
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.data.data.accessToken);
      toast.success("Login Successful!");
      router.push("/dashboard");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Login failed"),
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      setStep("otp");
      toast.success("OTP sent to your email!");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Registration failed"),
  });

  const otpMutation = useMutation({
    mutationFn: authService.verifyOtp,
    onSuccess: () => {
      toast.success("Account verified successfully!");
      setStep("login-reg");
    },
    onError: (err: any) => toast.error("Invalid OTP. Try again."),
  });

  // --- Handlers ---
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    loginMutation.mutate(data);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setTempEmail(formData.get("email") as string);
    registerMutation.mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8fafc] p-4">
      <Card className="w-full max-w-[450px] shadow-2xl border-none ring-1 ring-slate-200">
        <CardHeader className="space-y-1 text-center bg-slate-50/50 rounded-t-xl pb-8">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">CodeLumina AI</CardTitle>
          <CardDescription className="text-slate-500">
            {step === "otp" ? "Enter verification code" : "Intelligent Code Review Platform"}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {step === "login-reg" && (
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 p-1">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input name="email" type="email" placeholder="name@company.com" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Password</Label>
                      <button 
                        type="button" 
                        onClick={() => setStep("forgot-password")}
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input name="password" type="password" className="pl-10" required />
                    </div>
                  </div>
                  <Button className="w-full font-semibold" disabled={loginMutation.isPending}>
                    {loginMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label>First Name</Label>
                      <Input name="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-1">
                      <Label>Last Name</Label>
                      <Input name="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input name="email" type="email" required />
                  </div>
                  <div className="space-y-1">
                    <Label>Contact</Label>
                    <Input name="contact" placeholder="+8801..." required />
                  </div>
                  <div className="space-y-1">
                    <Label>Password</Label>
                    <Input name="password" type="password" required />
                  </div>
                  <Button className="w-full mt-2" disabled={registerMutation.isPending}>
                    {registerMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}

          {step === "otp" && (
            <div className="space-y-6 flex flex-col items-center">
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-600">We&apos;ve sent a 6-digit code to</p>
                <p className="font-semibold text-slate-900">{tempEmail}</p>
              </div>
              
              <InputOTP 
                maxLength={6} 
                onComplete={(otp) => otpMutation.mutate({ email: tempEmail, otp })}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button 
                variant="link" 
                onClick={() => setStep("login-reg")} 
                className="text-slate-500"
              >
                Back to Login
              </Button>
            </div>
          )}

          {/* Forgot Password Screen */}
          {step === "forgot-password" && (
            <div className="space-y-4">
               <Label>Enter your email to reset password</Label>
               <Input placeholder="email@example.com" onChange={(e) => setTempEmail(e.target.value)} />
               <Button className="w-full" onClick={() => toast.info("Check backend service for reset logic")}>
                  Send Reset Link
               </Button>
               <Button variant="ghost" className="w-full" onClick={() => setStep("login-reg")}>Back</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}