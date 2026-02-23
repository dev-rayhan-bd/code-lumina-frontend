import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export const Hero = () => (
  <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
          <Terminal size={16} /> <span>Powered by Llama-3.3 & Gemini Pro</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Automate Code Review with <span className="text-primary">AI Precision</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          An advanced evaluation system for Node.js security vulnerabilities. 
          Analyze accuracy and reliability in real-time.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="rounded-full px-8" asChild>
            <Link href="/login">Get Started Free <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8">View Methodology</Button>
        </div>
      </div>
    </div>
  </section>
);