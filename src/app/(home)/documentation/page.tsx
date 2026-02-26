/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { LandingNavbar } from "@/components/modules/shared/Navbar";
import { Footer } from "@/components/modules/shared/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Terminal, Calculator, FlaskConical, CircleDot, Rocket, ShieldCheck } from "lucide-react";
import docsData from "@/constants/docsData.json";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  "Dashboard Overview": Cpu,
  "Analytics Engine": Calculator,
  "Research Workflow": FlaskConical,
  "Data Sourcing": Terminal
};

const cardVariants: Variants = {
  hidden: (isLeft: boolean) => ({
    x: isLeft ? -100 : 100,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function DocumentationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const rocketY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col overflow-x-hidden">
      <main className="flex-1 pt-32 pb-40">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="text-center mb-40 space-y-4">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl md:text-8xl font-black italic tracking-tighter text-brand-primary drop-shadow-[0_0_30px_rgba(6,182,212,0.2)] uppercase"
            >
               System Archive
            </motion.h1>
            <p className="text-slate-100 text-lg mt-4 font-bold tracking-[0.4em] uppercase">Architecture & Methodology</p>
          </div>

          <div ref={containerRef} className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-brand-primary/20 -translate-x-1/2 hidden lg:block" />

            <motion.div 
              style={{ top: rocketY }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:flex items-center justify-center"
            >
              <div className="bg-brand-dark border-2 border-brand-primary p-3 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <Rocket size={24} className="text-brand-primary rotate-180" />
              </div>
            </motion.div>

            {docsData.map((section: any, index: number) => {
              const Icon = iconMap[section.category] || Cpu;
              const isLeft = index % 2 === 0;

              return (
                <div key={section.id} className="relative mb-32 lg:mb-56 last:mb-0">
                  <div className={cn(
                    "flex flex-col lg:flex-row items-center justify-between gap-12",
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  )}>
                    
                    <motion.div 
                      custom={isLeft}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      className="w-full lg:w-[46%]"
                    >
                      <Card className="bg-brand-deep border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden group hover:border-brand-primary/40 transition-all duration-500 ring-1 ring-white/5">
                        <div className="bg-brand-accent/40 p-8 border-b border-white/5 flex items-center justify-between">
                           <Badge className="bg-brand-primary text-brand-dark font-black tracking-widest px-4 py-1.5 rounded-full text-[10px]">
                              LOGIC 0{index + 1}
                           </Badge>
                           <Icon className="text-brand-primary w-6 h-6" size={24} />
                        </div>
                        
                        <div className="p-10 space-y-8">
                           <div className="space-y-3">
                              <h3 className="text-3xl font-black text-white tracking-tight italic uppercase group-hover:text-brand-primary transition-colors">
                                {section.title}
                              </h3>
                              <p className="text-slate-100 text-base leading-relaxed font-medium">
                                {section.description}
                              </p>
                           </div>
                           
                           <div className="space-y-4">
                              {section.technical_points.map((pt: any, i: number) => (
                                <div key={i} className="p-5 bg-brand-dark/60 rounded-3xl border border-white/5 hover:bg-brand-primary/[0.05] transition-colors">
                                   <div className="flex items-center gap-3 mb-2">
                                      <CircleDot size={14} className="text-brand-primary" />
                                      <h4 className="font-black text-white text-xs uppercase tracking-wider">{pt.point}</h4>
                                   </div>
                                   <p className="text-[11px] text-slate-100 leading-relaxed pl-6 font-medium">{pt.detail}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                      </Card>
                    </motion.div>

                    <div className="hidden lg:flex w-[46%] flex-col items-center justify-center">
                       <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          className="relative p-12 rounded-[3rem] bg-brand-primary/5 border border-brand-primary/20 flex flex-col items-center justify-center space-y-6 overflow-hidden group shadow-[0_0_50px_rgba(6,182,212,0.05)]"
                        >
                          {/* Background Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                          
                          <div className="relative z-10 p-6 bg-brand-dark rounded-3xl border border-brand-primary/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                            <Icon size={48} className="text-brand-primary animate-pulse" />
                          </div>
                          <div className="relative z-10 text-center space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-primary/80">Category</p>
                            <h4 className="text-xl font-bold text-white tracking-widest uppercase">{section.category}</h4>
                          </div>
                       </motion.div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mt-40 p-1 bg-brand-gradient rounded-[3rem] shadow-[0_0_50px_rgba(6,182,212,0.2)]"
          >
             <div className="bg-brand-dark rounded-[2.9rem] p-12 md:p-20 relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                    <ShieldCheck size={280} className="text-brand-primary" />
                </div>
                <div className="relative z-10 space-y-8 max-w-2xl text-left">
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase">Research Objective</h2>
                    <p className="text-lg md:text-xl text-slate-100 leading-relaxed font-medium">
                        The ultimate goal of this platform is to reach <span className="text-brand-primary font-black underline decoration-sky-500 underline-offset-8">100% Precision and Recall</span>. 
                        By providing a transparent benchmarking environment, we enable researchers to find the best-performing LLM 
                        configurations for securing the modern web.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="h-1.5 w-24 bg-brand-primary rounded-full" />
                        <div className="h-1.5 w-12 bg-brand-secondary rounded-full" />
                    </div>
                </div>
             </div>
          </motion.div>

        </div>
      </main>

    </div>
  );
}