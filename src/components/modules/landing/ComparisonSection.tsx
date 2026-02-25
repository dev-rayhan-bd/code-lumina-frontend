import { Check, X, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ModelComparison = () => (
  <section className="py-24 bg-brand-dark relative">
    {/* Decorative background glow */}
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 blur-[100px] rounded-full" />
    
    <div className="container mx-auto px-6 max-w-5xl relative z-10">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs">Comparison Study</h2>
        <h1 className="text-4xl font-black text-white tracking-tighter">Llama-3.3 vs. Gemini Pro</h1>
      </div>

      <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-deep shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-accent/50">
              <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-white/5">Metric</th>
              <th className="p-6 text-center text-brand-primary font-black text-lg border-b border-white/5">Llama-3.3</th>
              <th className="p-6 text-center text-brand-secondary font-black text-lg border-b border-white/5">Gemini 1.5</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { m: "Detection Latency", l: "Sub 1s", g: "3-5s" },
              { m: "OWASP Coverage", l: "95%", g: "92%" },
              { m: "Zero-shot Reasoning", l: true, g: true },
              { m: "Reliability Index", l: "0.94", g: "0.89" },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors group">
                <td className="p-6 text-sm font-bold text-slate-300 group-hover:text-brand-primary transition-colors">{row.m}</td>
                <td className="p-6 text-center font-bold text-slate-400">
                  {typeof row.l === 'boolean' ? <Check className="mx-auto text-cyan-400 w-5 h-5" /> : <Badge className="bg-brand-primary/10 text-brand-primary border-none">{row.l}</Badge>}
                </td>
                <td className="p-6 text-center font-bold text-slate-400">
                  {typeof row.g === 'boolean' ? <Check className="mx-auto text-emerald-400 w-5 h-5" /> : <Badge className="bg-brand-secondary/10 text-brand-secondary border-none">{row.g}</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);