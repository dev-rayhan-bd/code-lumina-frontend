"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Database, 
  Binary, 
  LineChart, 
  ShieldCheck, 
  ArrowRight,
  GitCompare
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Database,
    title: "Dataset Injection",
    description: "Input controlled Node.js snippets from OWASP and SARD benchmarks.",
    color: "text-blue-400",
  },
  {
    icon: Binary,
    title: "LLM Processing",
    description: "Connect any LLM (GPT, Gemini, Llama) to analyze logic and data-flow.",
    color: "text-brand-primary",
  },
  {
    icon: GitCompare,
    title: "Ground Truth Mapping",
    description: "Automated classification into TP, TN, FP, and FN matrix.",
    color: "text-emerald-400",
  },
  {
    icon: LineChart,
    title: "Metric Calculation",
    description: "Real-time calculation of Precision, Recall, and F1-Score.",
    color: "text-purple-400",
  },
];

export const ResearchFramework = () => {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs">Architectural Logic</h2>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic">
            EVALUATION <span className="text-brand-primary font-light">FRAMEWORK</span>
          </h1>
          <p className="text-slate-100 text-lg opacity-80 leading-relaxed font-medium">
            A model-agnostic system designed to quantify the reliability of automated security audits.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="absolute top-1/2 left-0 w-full h-px border-t border-dashed border-brand-primary/20 -translate-y-1/2 hidden md:block" />

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <Card className="bg-brand-deep/80 border-white/5 rounded-[2rem] p-8 shadow-2xl hover:border-brand-primary/40 transition-all duration-500 group h-full flex flex-col items-center text-center">
                <div className="bg-brand-dark p-5 rounded-3xl border border-white/10 group-hover:border-brand-primary/30 transition-all shadow-xl group-hover:scale-110 mb-6">
                  <step.icon className={cn("w-8 h-8", step.color)} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight italic uppercase">
                  {step.title}
                </h3>
                <p className="text-slate-100 text-sm leading-relaxed font-medium opacity-80">
                  {step.description}
                </p>

                {/* Step Indicator */}
                <div className="mt-auto pt-6 flex items-center gap-2">
                   <div className="h-1 w-8 bg-brand-dark rounded-full overflow-hidden">
                      <div className="h-full bg-brand-primary w-1/2" />
                   </div>
                   <span className="text-[10px] font-black text-brand-primary font-mono opacity-50">0{i+1}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Research Note */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left bg-brand-accent/30 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-sm">
          <div className="bg-brand-primary/10 p-3 rounded-2xl border border-brand-primary/20">
             <ShieldCheck className="text-brand-primary w-6 h-6" />
          </div>
          <div className="max-w-2xl">
            <h4 className="text-white font-bold text-lg mb-1 italic uppercase tracking-tight">Model-Agnostic Benchmarking</h4>
            <p className="text-slate-100 text-sm leading-relaxed opacity-80 font-medium">
               Our system treats LLMs as black-box engines. Whether you use GPT-4, Llama-3, or Claude, the platform measures their logic against strict human-verified ground truths to produce unbiased research data.
            </p>
          </div>
          <ArrowRight className="text-brand-primary opacity-20 hidden lg:block" size={40} />
        </div>
      </div>
    </section>
  );
};