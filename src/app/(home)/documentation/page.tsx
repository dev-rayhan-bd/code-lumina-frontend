/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, Variants } from "framer-motion";
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
    x: isLeft ? -50 : 50,
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
    offset: ["start center", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const rocketY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col overflow-x-hidden">
      
      {/* CSS for moving dots animation */}
      <style jsx global>{`
        @keyframes dash-move {
          to { stroke-dashoffset: -20; }
        }
        .moving-dots {
          stroke-dasharray: 8, 8;
          animation: dash-move 1s linear infinite;
        }
      `}</style>

      <main className="flex-1 pt-32 pb-40">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Title Section */}
          <div className="text-center mb-40">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black italic tracking-tighter text-brand-primary drop-shadow-[0_0_30px_rgba(6,182,212,0.2)] uppercase"
            >
               System Archive
            </motion.h1>
            <p className="text-slate-100 text-lg mt-4 font-bold tracking-[0.4em] uppercase opacity-60">Architecture & Methodology</p>
          </div>

          {/* Timeline Container */}
          <div ref={containerRef} className="relative">
            
       
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden lg:block z-0">
               <svg width="2" height="100%" className="h-full overflow-visible">
                  <line 
                    x1="0" y1="0" x2="0" y2="100%" 
                    stroke="rgba(6, 182, 212, 0.4)" 
                    strokeWidth="3" 
                    className="moving-dots" 
                  />
               </svg>
            </div>

          
            <motion.div 
              style={{ top: rocketY }}
              className="absolute left-1/2 -translate-x-1/2 z-30 hidden lg:flex items-center justify-center pointer-events-none"
            >
              <div className="bg-brand-dark border-2 border-brand-primary p-2.5 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.6)] backdrop-blur-md">
                <Rocket size={20} className="text-brand-primary" />
              </div>
            </motion.div>

            {docsData.map((section: any, index: number) => {
              const Icon = iconMap[section.category] || Cpu;
              const isLeft = index % 2 === 0;

              return (
                <div key={section.id} className="relative mb-32 lg:mb-64 last:mb-0">
                  
        
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    
                    {/* Content Card (Left or Right based on index) */}
                    <motion.div 
                      custom={isLeft}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      className={cn(
                        "w-full order-2",
                        isLeft ? "lg:order-1" : "lg:order-2"
                      )}
                    >
                      <Card className="bg-[#0a192f] border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden ring-1 ring-white/5 group hover:border-brand-primary/40 transition-all duration-500">
                        <div className="bg-brand-accent/40 p-6 border-b border-white/5 flex items-center justify-between">
                           <Badge className="bg-brand-primary text-brand-dark font-black tracking-widest px-4 py-1.5 rounded-full text-[10px]">
                              STEP 0{index + 1}
                           </Badge>
                           <Icon className="text-brand-primary w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                        
                        <div className="p-8 space-y-6">
                           <div className="space-y-3">
                              <h3 className="text-2xl font-black text-white italic group-hover:text-brand-primary transition-colors uppercase leading-tight">
                                {section.title}
                              </h3>
                              <p className="text-slate-100 text-sm leading-relaxed font-medium">
                                {section.description}
                              </p>
                           </div>
                           
                           {/* Sub-Technical Points */}
                           <div className="space-y-3">
                              {section.technical_points.map((pt: any, i: number) => (
                                <div key={i} className="p-4 bg-brand-dark/60 rounded-2xl border border-white/10 hover:bg-brand-primary/[0.03] transition-colors">
                                   <div className="flex items-center gap-3 mb-1.5">
                                      <CircleDot size={12} className="text-brand-primary" />
                                      <h4 className="font-black text-white text-[10px] uppercase tracking-wider">{pt.point}</h4>
                                   </div>
                                   <p className="text-xs text-slate-100 leading-relaxed pl-6 opacity-80">{pt.detail}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                      </Card>
                    </motion.div>

                    {/* Placeholder Area (To maintain the zigzag) */}
                    <div className={cn(
                      "hidden lg:flex flex-col items-center justify-center order-1",
                      isLeft ? "lg:order-2" : "lg:order-1"
                    )}>
                       <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          className="p-12 rounded-[4rem] bg-brand-primary/5 border border-brand-primary/10 flex flex-col items-center justify-center space-y-4 shadow-inner"
                        >
                          <div className="p-6 bg-brand-dark rounded-3xl border border-brand-primary/20 shadow-xl">
                            <Icon size={48} className="text-brand-primary opacity-50" />
                          </div>
                          <h4 className="text-sm font-black text-white tracking-[0.4em] uppercase opacity-30">{section.category}</h4>
                       </motion.div>
                    </div>

                  </div>

             
                </div>
              );
            })}
          </div>

          {/* --- Research Objective Section (Image 3 Style) --- */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mt-60 p-1 bg-brand-gradient rounded-[3.5rem] shadow-[0_0_80px_rgba(6,182,212,0.2)] group"
          >
             <div className="bg-[#05111b] rounded-[3.4rem] p-12 md:p-24 relative overflow-hidden">
                <div className="absolute right-0 top-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-1000">
                    <ShieldCheck size={400} className="text-brand-primary" />
                </div>
                
                <div className="relative z-10 space-y-8 max-w-3xl">
                    <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none">
                        Research <br /> <span className="text-brand-primary">Objective</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-100 leading-relaxed font-medium">
                        The ultimate goal of this platform is to reach <span className="text-brand-primary font-black underline decoration-brand-primary/40 underline-offset-[10px]">100% Precision and Recall</span>. 
                        By providing a transparent benchmarking environment, we empower researchers to secure the modern web.
                    </p>
                    <div className="flex gap-4 pt-8">
                        <div className="h-1.5 w-24 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
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