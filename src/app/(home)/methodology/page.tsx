/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, Variants } from "framer-motion"; 
import { 
  Brain, 
  Target, 
  ShieldCheck, 
  Repeat, 
  Database, 
  BarChart3,
  CircleDot,
  CheckCircle2,
  LucideIcon 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


interface IResearchStep {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

export default function MethodologyPage() {
  const researchSteps: IResearchStep[] = [
    { 
      icon: Brain, 
      title: "Model Selection", 
      desc: "Comparing Llama-3.3 (70B) via Groq for performance and Gemini 1.5 Pro for deep contextual reasoning.",
      color: "text-blue-400"
    },
    { 
      icon: Database, 
      title: "Dataset Generation", 
      desc: "Using a controlled dataset of 500+ Node.js snippets covering OWASP Top 10 security risks.",
      color: "text-emerald-400"
    },
    { 
      icon: Repeat, 
      title: "Iterative Validation", 
      desc: "Running each code snippet through 5 cycles to measure the Reliability Index of the LLMs.",
      color: "text-purple-400"
    },
    { 
      icon: Target, 
      title: "Classification Logic", 
      desc: "Mapping AI outputs to Ground Truth to categorize results into TP, TN, FP, and FN.",
      color: "text-brand-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col overflow-x-hidden">
      <main className="flex-1 pt-32 pb-40">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-28 space-y-4"
          >
            <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 px-4 py-1 rounded-full font-bold tracking-widest uppercase text-[10px]">
              Scientific Framework
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-none">
              Research <span className="text-brand-primary">Methodology</span>
            </h1>
            <p className="text-slate-100 text-lg font-medium opacity-80 leading-relaxed mt-4">
              A systematic approach to evaluating the precision of Large Language Models in detecting 
              Node.js vulnerabilities.
            </p>
          </motion.div>

          {/* Grid with correct variants */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 mb-32"
          >
            {researchSteps.map((step, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="group relative bg-[#0a192f] border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-brand-primary/40 ring-1 ring-white/5 h-full">
                  <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700" />
                  
                  <CardHeader className="flex flex-row items-center gap-6 p-8 pb-4 relative z-10">
                    <div className="bg-brand-dark p-4 rounded-3xl border border-white/10 group-hover:border-brand-primary transition-all duration-500 shadow-xl group-hover:scale-110">
                      <step.icon className={cn("w-8 h-8", step.color)} />
                    </div>
                    <CardTitle className="text-2xl font-black italic text-white group-hover:text-brand-primary transition-colors tracking-tight uppercase">
                        {step.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-8 pt-0 relative z-10">
                    <p className="text-slate-100 text-base leading-relaxed font-medium opacity-90">
                      {step.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Metrics Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-deep/50 rounded-[3.5rem] p-10 md:p-16 border border-white/5 relative overflow-hidden ring-1 ring-white/5"
          >
            <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-8 text-left">
                <div className="space-y-2">
                  <h3 className="text-4xl font-black italic flex items-center gap-4 text-white uppercase">
                    <BarChart3 className="text-brand-primary w-10 h-10" /> Core Metrics
                  </h3>
                  <div className="h-1 w-20 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                </div>
                
                <p className="text-slate-100 text-lg font-medium leading-relaxed">
                  To ensure scientific validity, CodeLumina AI calculates 4 essential statistical parameters 
                  based on the <b>Confusion Matrix</b>:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { t: "Accuracy", d: "(TP + TN) / Total" },
                    { t: "Precision", d: "TP / (TP + FP)" },
                    { t: "Recall", d: "TP / (TP + FN)" },
                    { t: "F1-Score", d: "2 * (P * R) / (P + R)" }
                  ].map((m, i) => (
                    <div key={i} className="p-5 bg-brand-dark/80 rounded-2xl border border-white/5 hover:border-brand-primary/20 transition-all">
                       <div className="flex items-center gap-3 mb-1">
                          <CircleDot size={12} className="text-brand-primary" />
                          <h4 className="font-bold text-white text-sm uppercase tracking-wider">{m.t}</h4>
                       </div>
                       <p className="text-[10px] font-mono text-brand-secondary">{m.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="p-10 bg-brand-dark rounded-[3rem] border border-brand-primary/20 flex flex-col items-center justify-center space-y-6 shadow-2xl relative"
                >
                   <div className="p-6 bg-brand-deep rounded-full border border-white/5 shadow-inner">
                      <ShieldCheck className="w-24 h-24 text-brand-secondary" />
                   </div>
                   <div className="text-center">
                      <p className="text-[11px] font-black text-brand-primary uppercase tracking-[0.4em] mb-2">Authenticated</p>
                      <h4 className="text-white font-bold text-xl leading-tight uppercase">Evaluation Framework</h4>
                   </div>
                   <CheckCircle2 className="absolute top-6 right-8 text-brand-primary opacity-20 w-8 h-8" />
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}