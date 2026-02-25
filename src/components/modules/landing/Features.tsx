import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  SearchCode, 
  FileJson, 
  Lock 
} from "lucide-react";

const features = [
  {
    title: "AI-Powered Auditing",
    description: "Leverage state-of-the-art LLMs (Llama-3.3, Gemini 1.5 Pro) to analyze complex Node.js logic.",
    icon: Zap,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Security Deep Dive",
    description: "Built-in detection for OWASP Top 10 vulnerabilities like SQL Injection and XSS.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    title: "Reliability Metrics",
    description: "Evaluate the consistency of AI responses through automated multi-iteration testing.",
    icon: BarChart3,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },

];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs">
            Core Capabilities
          </h2>
          <h1 className="text-4xl font-black text-white md:text-5xl tracking-tight">
            Everything you need to <span className="text-brand-primary">evaluate</span> AI
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-[2rem] bg-brand-deep border border-white/5 hover:border-brand-primary/30 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bg} mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};