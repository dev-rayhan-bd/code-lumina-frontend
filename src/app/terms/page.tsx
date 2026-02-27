"use client";
import { LandingNavbar } from "@/components/modules/shared/Navbar";
import { Footer } from "@/components/modules/shared/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, AlertTriangle, UserCheck, Gavel } from "lucide-react";

export default function TermsPage() {
  const terms = [
    {
      icon: UserCheck,
      title: "Acceptance of Terms",
      content: "By accessing CodeLumina AI, you agree to use the platform solely for educational and research-related code auditing. You must be a registered user to access the audit engine."
    },
    {
      icon: AlertTriangle,
      title: "No Warranty",
      content: "CodeLumina AI provides automated reviews based on Large Language Models. While we strive for accuracy, the results may contain 'Hallucinations' or errors. Do not use AI suggestions in production without manual verification."
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      content: "Md Rayhan and the research team are not responsible for any security breaches or data loss resulting from the implementation of AI-suggested code changes."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col">
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
             <Gavel className="w-12 h-12 text-brand-primary mx-auto opacity-50" />
             <h1 className="text-5xl font-black italic tracking-tighter uppercase">Terms of Service</h1>
             <p className="text-slate-400">Researcher Agreement & Usage Rules</p>
          </div>

          <div className="space-y-8">
            {terms.map((t, i) => (
              <Card key={i} className="bg-brand-deep border-white/5 rounded-[2rem] p-8 shadow-2xl">
                <CardContent className="p-0 space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="bg-brand-primary/10 p-2.5 rounded-xl border border-brand-primary/20 text-brand-primary">
                         <t.icon size={20} />
                      </div>
                      <h2 className="text-2xl font-bold italic tracking-tight">{t.title}</h2>
                   </div>
                   <p className="text-slate-100 leading-relaxed font-medium">
                      {t.content}
                   </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* <div className="mt-12 text-center text-slate-500 text-xs tracking-widest uppercase font-bold">
             Developed under the CSE Final Year Research Framework.
          </div> */}
        </div>
      </main>
    </div>
  );
}