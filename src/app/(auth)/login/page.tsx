"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import LoginForm from "@/components/modules/auth/LoginForm";
import RegisterForm from "@/components/modules/auth/RegisterForm";
import OtpView from "@/components/modules/auth/OtpView";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForgotPassView from "@/components/modules/auth/ForgotPasswordView";

export type AuthStep = "login-reg" | "otp" | "forgot-password";

export default function AuthPage() {
  const [step, setStep] = useState<AuthStep>("login-reg");
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8fafc] p-4">
      <Card className="w-full max-w-[450px] shadow-2xl border-none">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">CodeLumina AI</CardTitle>
          <CardDescription>Intelligent Node.js Security Auditor</CardDescription>
        </CardHeader>
        <CardContent>
          {step === "login-reg" && (
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm onForgotPass={() => setStep("forgot-password")} />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm onRegisterSuccess={(mail) => { setEmail(mail); setStep("otp"); }} />
              </TabsContent>
            </Tabs>
          )}

          {step === "otp" && (
            <OtpView email={email} onBack={() => setStep("login-reg")} />
          )}

          {step === "forgot-password" && (
            <ForgotPassView onBack={() => setStep("login-reg")} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}