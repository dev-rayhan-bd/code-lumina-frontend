// src/components/modules/landing/Hero.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Shadcn UI badge
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import codeSnippetImg from '@/assets/code-snipet.png';

export const Hero = () => (
  <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white">
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <Badge className="py-1 px-4 border-primary/20 bg-primary/5 text-primary rounded-full font-bold animate-pulse">
          CSE Final Year Thesis Project
        </Badge>
        
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
          Evaluating AI in <br />
          <span className="text-primary underline decoration-sky-300 underline-offset-8 font-extrabold">
            Node.js Security
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          A quantitative study on LLM-powered automated code reviews. Compare Gemini & Llama accuracy against industry-standard security benchmarks.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
          <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95" asChild>
            <Link href="/login">Launch Audit Engine <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
          <Button size="lg" variant="ghost" className="rounded-full h-14 px-8 text-lg font-semibold hover:bg-primary/5" asChild>
            <Link href="/methodology">Read Methodology</Link>
          </Button>
        </div>

        {/* Floating Code Snippet Visual */}
        <div className="pt-20 relative hidden md:block">
          <div className="relative mx-auto max-w-[800px] rounded-2xl border bg-white/50 p-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] backdrop-blur-sm">
            <div className="overflow-hidden rounded-xl border shadow-2xl">
              <Image 
                src={codeSnippetImg} 
                alt="Code Audit Snippet Preview" 
                layout="responsive"
                priority 
                className="transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
            
            {/* Decorative circles to look like a browser/editor */}
            <div className="absolute top-6 left-6 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);