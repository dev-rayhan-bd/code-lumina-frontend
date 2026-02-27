"use client";
import { LandingNavbar } from "@/components/modules/shared/Navbar";
import { Footer } from "@/components/modules/shared/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Lock, EyeOff, FileText } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Lock,
      title: "Data Collection",
      content: "We collect basic profile information (name, email) and the code snippets you submit for auditing. This data is essential for calculating the accuracy and reliability of our AI models."
    },
    {
      icon: ShieldCheck,
      title: "How We Use Your Code",
      content: "Submitted code is processed via secure LLM APIs (Groq/Gemini). As this is a research project, snippets may be manually audited by the researcher to establish 'Ground Truth' for statistical validation."
    },
    {
      icon: EyeOff,
      title: "Data Security",
      content: "Your session is protected by HttpOnly cookies. We do not sell your data. Code snippets are stored in an encrypted database and are used strictly for academic evaluation."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col">
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
             <FileText className="w-12 h-12 text-brand-primary mx-auto opacity-50" />
             <h1 className="text-5xl font-black italic tracking-tighter uppercase">Privacy Policy</h1>
             <p className="text-slate-400">Last Updated: February 2026</p>
          </div>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <Card key={i} className="bg-brand-deep border-white/5 rounded-[2rem] p-8 shadow-2xl">
                <CardContent className="p-0 space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="bg-brand-primary/10 p-2.5 rounded-xl border border-brand-primary/20 text-brand-primary">
                         <s.icon size={20} />
                      </div>
                      <h2 className="text-2xl font-bold italic tracking-tight">{s.title}</h2>
                   </div>
                   <p className="text-slate-100 leading-relaxed font-medium">
                      {s.content}
                   </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-8 bg-brand-accent/30 rounded-3xl border border-dashed border-white/10 text-center">
             <p className="text-sm text-slate-500 italic">
                Note: By using CodeLumina AI, you acknowledge that this is a research environment and data is collected for thesis evaluation purposes.
             </p>
          </div>
        </div>
      </main>
    </div>
  );
}