"use client";

import { useQuery } from "@tanstack/react-query";
import { reviewService } from "@/services/review.service";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const ResearchStats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["global-metrics"],
    queryFn: reviewService.getGlobalMetrics,
    refetchInterval: 60000, 
  });


  if (isLoading) {
    return (
      <section className="py-20 bg-brand-deep relative border-y border-white/5">
        <div className="container mx-auto px-6 flex justify-center items-center gap-4">
          <Loader2 className="animate-spin text-brand-primary" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Syncing Live Metrics...</p>
        </div>
      </section>
    );
  }

  if (isError) return null;

  const stats = [
    { 
      label: "Audits Completed", 
      value: data.metrics.totalSamples || "0" 
    },
    { 
      label: "Success Accuracy", 
      value: data.metrics.accuracy || "0%" 
    },
    { 
      label: "System Recall", 
      value: data.metrics.recall || "0%" 
    },
    { 
      label: "Inference Speed", 
      value: "Sub-1s"
    },
  ];

  return (
    <section className="py-20 bg-brand-deep relative border-y border-white/5 overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
        {stats.map((stat, i) => (
          <div key={i} className="space-y-3 group cursor-default">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter transition-all duration-500 group-hover:scale-110">
              <span className="bg-clip-text text-transparent bg-brand-gradient">
                {stat.value}
              </span>
            </h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover:text-brand-primary transition-colors">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};