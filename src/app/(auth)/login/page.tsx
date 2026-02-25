"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck } from "lucide-react";
import LoginForm from "@/components/modules/auth/LoginForm";
import RegisterForm from "@/components/modules/auth/RegisterForm";
import OtpView from "@/components/modules/auth/OtpView";
import ForgotPassView from "@/components/modules/auth/ForgotPasswordView";


export default function AuthPage() {
  const [step, setStep] = useState<"auth" | "otp" | "forgot">("auth");
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-dark p-4 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full" />
      
      <Card className="w-full max-w-[450px] bg-brand-deep border-white/5 shadow-2xl text-white backdrop-blur-xl relative z-10">
        <CardHeader className="text-center space-y-1">
          <div className="bg-brand-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-primary/20">
            <ShieldCheck className="text-brand-primary w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tighter">CodeLumina AI</CardTitle>
          <CardDescription className="text-slate-400">Secure Node.js Audit Platform</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-2">
          {step === "auth" && (
            <Tabs defaultValue={searchParams.get("tab") || "login"}>
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-brand-accent p-1">
                <TabsTrigger value="login" className="data-[state=active]:bg-brand-primary">Login</TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-brand-primary">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm onForgotPass={() => setStep("forgot")} />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm onRegisterSuccess={(mail) => { setEmail(mail); setStep("otp"); }} />
              </TabsContent>
            </Tabs>
          )}

          {step === "otp" && (
            <OtpView email={email} onBack={() => setStep("auth")} />
          )}

          {step === "forgot" && (
            <ForgotPassView onBack={() => setStep("auth")} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}