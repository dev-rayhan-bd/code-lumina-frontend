
import { 
  Brain, 
  Target, 
  ShieldCheck, 
  Repeat, 
  Database, 
  BarChart3 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function MethodologyPage() {
  const researchSteps = [
    { 
      icon: Brain, 
      title: "Model Selection", 
      desc: "Comparing Llama-3.3 (70B) via Groq for performance and Gemini 1.5 Pro for deep contextual reasoning." 
    },
    { 
      icon: Database, 
      title: "Dataset Generation", 
      desc: "Using a controlled dataset of 500+ Node.js snippets covering OWASP Top 10 security risks." 
    },
    { 
      icon: Repeat, 
      title: "Iterative Validation", 
      desc: "Running each code snippet through 5 cycles to measure the Reliability Index of the LLMs." 
    },
    { 
      icon: Target, 
      title: "Classification Logic", 
      desc: "Mapping AI outputs to Ground Truth to categorize results into TP, TN, FP, and FN." 
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col">


      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-brand-primary font-bold tracking-[0.3em] uppercase text-sm">Our Approach</h2>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Research Methodology</h1>
            <p className="text-slate-400 text-lg">
              A systematic evaluation of Large Language Models in identifying vulnerabilities within Node.js environments.
            </p>
          </div>

          {/* Methodology Steps Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {researchSteps.map((step, index) => (
              <Card key={index} className="bg-brand-deep border-white/5 shadow-2xl hover:border-brand-primary/30 transition-all group p-4">
                <CardHeader className="flex flex-row items-center gap-5 pb-4">
                  <div className="bg-brand-accent p-3 rounded-2xl group-hover:scale-110 transition-transform">
                    <step.icon className="text-brand-primary w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl text-white">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Scientific Metrics Section */}
          <div className="bg-brand-accent/30 rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold flex items-center gap-3">
                  <BarChart3 className="text-brand-primary" /> Core Metrics
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  To ensure the scientific validity of our study, we calculate the following parameters for each tested model:
                </p>
                <ul className="space-y-4">
                  {[
                    "Accuracy: The ratio of correct predictions to total cases.",
                    "Precision: The reliability of vulnerability detection (TP / TP+FP).",
                    "Recall: The ability to find all actual bugs (TP / TP+FN).",
                    "F1-Score: The harmonic mean of precision and recall."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-brand-dark rounded-3xl border border-white/5 flex flex-col items-center justify-center space-y-4">
                 <ShieldCheck className="w-20 h-20 text-brand-secondary opacity-20" />
                 <p className="text-xs font-mono text-brand-primary uppercase tracking-[0.2em]">Verified Evaluation Framework</p>
              </div>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
}