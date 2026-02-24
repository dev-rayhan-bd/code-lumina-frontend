import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

export const ComparisonSection = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Cross-Model Comparison</h2>
        <p className="text-slate-500">How we evaluate Llama-3 vs. Gemini Pro on Node.js Security.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-sm font-bold text-slate-600">Metric</th>
              <th className="p-4 text-sm font-bold text-slate-600 text-center font-mono">Llama-3.3</th>
              <th className="p-4 text-sm font-bold text-slate-600 text-center font-mono">Gemini-1.5</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              { m: "Vulnerability Detection", l: true, g: true },
              { m: "False Positive Reduction", l: true, g: false },
              { m: "Contextual Refactoring", l: false, g: true },
              { m: "API Response Speed", l: "Fast (Groq)", g: "Average" },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 text-sm font-medium text-slate-700">{row.m}</td>
                <td className="p-4 text-center">
                  {typeof row.l === 'boolean' ? (row.l ? <Check className="mx-auto text-green-500 w-5" /> : <X className="mx-auto text-red-400 w-5" />) : <Badge variant="secondary">{row.l}</Badge>}
                </td>
                <td className="p-4 text-center">
                  {typeof row.g === 'boolean' ? (row.g ? <Check className="mx-auto text-green-500 w-5" /> : <X className="mx-auto text-red-400 w-5" />) : <Badge variant="secondary">{row.g}</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);