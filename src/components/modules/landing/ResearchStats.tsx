import { Card } from "@/components/ui/card";

const stats = [
  { label: "Evaluation Accuracy", value: "94.2%" },
  { label: "Code Samples Tested", value: "500+" },
  { label: "Reliability Index", value: "0.89" },
  { label: "Vulnerability Types", value: "10+" },
];

export const ResearchStats = () => (
  <section className="py-12 bg-slate-50 border-y border-slate-100">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center space-y-1">
            <h3 className="text-3xl font-black text-primary">{stat.value}</h3>
            <p className="text-xs uppercase tracking-widest font-bold text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);