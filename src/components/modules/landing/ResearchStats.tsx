export const ResearchStats = () => (
  <section className="py-20 bg-brand-deep relative border-y border-white/5">
    <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
      {[
        { v: "1.2k", l: "Audits Completed" },
        { v: "94%", l: "Success Accuracy" },
        { v: "0.02%", l: "False Negatives" },
        { v: "15ms", l: "Inference Speed" },
      ].map((stat, i) => (
        <div key={i} className="space-y-2">
          <h2 className="text-5xl font-black text-white tracking-tighter bg-clip-text text-transparent bg-brand-gradient">
            {stat.v}
          </h2>
          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">
            {stat.l}
          </p>
        </div>
      ))}
    </div>
  </section>
);