
import { CheckCircle2, Terminal, Code2, LineChart } from "lucide-react";

export default function DocsPage() {
  const steps = [
    { icon: Code2, t: "Prepare Snippet", d: "Copy your Node.js/Express code block that needs security evaluation." },
    { icon: Terminal, t: "Set Ground Truth", d: "Label your code as 'Safe' or 'Vulnerable' for accuracy calculation." },
    { icon: LineChart, t: "Run AI Review", d: "The LLM engine analyzes the logic and identifies OWASP vulnerabilities." },
    { icon: CheckCircle2, t: "Export Analysis", d: "Review the classification (TP, TN, FP, FN) and save results for your study." },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white">

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-center">Documentation</h1>
        <p className="text-slate-400 text-center text-lg mb-20 max-w-2xl mx-auto">
          Learn how to use CodeLumina AI to evaluate the precision of large language models in code auditing.
        </p>

        <div className="space-y-16">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 items-center md:items-start group">
              <div className="w-16 h-16 rounded-2xl bg-brand-deep border border-white/5 flex items-center justify-center shrink-0 group-hover:border-brand-primary transition-colors">
                <s.icon className="text-brand-primary w-8 h-8" />
              </div>
              <div className="space-y-3 text-center md:text-left">
                <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-3">
                  <span className="text-brand-primary opacity-30 font-mono italic">0{i+1}.</span> {s.t}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}