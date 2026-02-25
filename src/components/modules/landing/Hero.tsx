import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import codeSnippetImg from '@/assets/code-snipet.png';

export const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden bg-brand-dark">
    {/* Background Glows */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 blur-[150px] rounded-full" />
    
    <div className="container mx-auto px-6 relative z-10 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 py-1 px-4 rounded-full font-bold">
          CSE Final Year Thesis Project
        </Badge>
        
        <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
          Evaluating AI in <br />
          <span className="text-transparent bg-clip-text bg-brand-gradient">
            Node.js Security
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          A quantitative study on LLM accuracy. Analyze your Node.js code with 
          Llama-3.3 & Gemini Pro to detect critical vulnerabilities.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Button size="lg" className="rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white px-8 h-14 font-bold shadow-lg shadow-brand-primary/20 transition-all hover:scale-105" asChild>
            <Link href="/login">Get Started Free <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full border-slate-700 text-slate-300 px-8 h-14 font-semibold hover:bg-white/5" asChild>
            <Link href="/methodology">View Methodology</Link>
          </Button>
        </div>

        {/* Hero Image Restored */}
        <div className="pt-20 relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-white/10 bg-brand-deep/50 p-2 shadow-2xl backdrop-blur-sm">
            <div className="overflow-hidden rounded-xl border border-white/5">
              <Image 
                src={codeSnippetImg} 
                alt="Code Audit Snippet" 
                layout="responsive"
                priority
                className="opacity-90"
              />
            </div>
            {/* Browser Dots */}
            <div className="absolute top-6 left-6 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);