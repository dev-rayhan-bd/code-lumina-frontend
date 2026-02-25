/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, ShieldAlert, Zap, Target, CheckCircle2, AlertTriangle, Loader2, Code2, Search, Bug, Settings, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CodeReviewPage() {
  const [code, setCode] = useState("// Paste your Node.js code here...");
  const [gt, setGt] = useState("Vulnerable");
  const [result, setResult] = useState<any>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.post("/review/code", payload);
      return res.data.data; // নিশ্চিত করো backend রেসপন্স এখান থেকেই আসছে
    },
    onSuccess: (data) => {
      setResult(data);
      toast.success(`Analysis Complete! Classified as ${data.classification}`);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Audit failed");
    }
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* --- Top Header & Action Bar --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tighter italic flex items-center gap-3">
            <div className="h-8 w-2 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
            NEW AUDIT
          </h1>
          <p className="text-slate-100 text-sm font-medium pl-5">Benchmark LLM Precision vs. Human Ground Truth</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 bg-brand-deep/50 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-2 px-3">
                <span className="text-[10px] font-black text-slate-100 uppercase tracking-widest">Ground Truth:</span>
                <Select value={gt} onValueChange={setGt}>
                    <SelectTrigger className="w-36 h-10 bg-brand-dark border-white/10 text-brand-primary font-bold rounded-xl focus:ring-brand-primary/30 transition-all">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-deep border-white/10 text-white rounded-xl">
                        <SelectItem value="Vulnerable" className="focus:bg-brand-primary focus:text-brand-dark font-medium">Vulnerable</SelectItem>
                        <SelectItem value="Safe" className="focus:bg-brand-primary focus:text-brand-dark font-medium">Safe</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button 
              onClick={() => mutate({ code, groundTruth: gt })} 
              disabled={isPending}
              className="bg-brand-gradient hover:opacity-90 text-brand-dark font-black px-8 h-12 rounded-xl shadow-lg shadow-brand-primary/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {isPending ? <Loader2 className="animate-spin" /> : <><Play size={18} className="mr-2 fill-current" /> RUN AUDIT</>}
            </Button>
        </div>
      </div>

      {/* --- Main Audit Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px]">
        
  <Card className="lg:col-span-7 bg-[#1e1e1e] border-none shadow-2xl overflow-hidden rounded-xl ring-1 ring-white/10 flex flex-col">
  
  {/* --- VS Code Style Title Bar --- */}
  <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-black/20">
    <div className="flex items-center gap-4">
      {/* Window Controls */}
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
      
      {/* File Tab */}
      <div className="flex items-center gap-2 bg-[#1e1e1e] px-4 py-1.5 rounded-t-lg border-t border-x border-white/5 text-slate-300 text-xs font-medium relative -bottom-[9px]">
        <Code2 size={14} className="text-brand-primary" />
        index.js
        <X size={12} className="ml-2 opacity-50 hover:opacity-100 cursor-pointer" />
      </div>
    </div>
    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Node.js Environment</span>
  </div>

  <div className="flex flex-1">
    {/* --- Fake Sidebar (VS Code Activity Bar vibe) --- */}
    <div className="w-12 bg-[#333333] hidden sm:flex flex-col items-center py-4 gap-4 border-r border-black/20">
       <div className="p-2 text-white border-l-2 border-brand-primary bg-white/5"><Code2 size={20} /></div>
       <div className="p-2 text-slate-500 hover:text-white transition-colors"><Search size={20} /></div>
       <div className="p-2 text-slate-500 hover:text-white transition-colors"><Bug size={20} /></div>
       <div className="mt-auto p-2 text-slate-500"><Settings size={20} /></div>
    </div>

    {/* --- Monaco Editor --- */}
    <div className="flex-1 pt-2">
      <Editor
        height="500px"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(v) => setCode(v || "")}
        loading={<Loader2 className="animate-spin text-brand-primary" />}
        options={{
          fontSize: 14,
          fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
          fontLigatures: true,
          minimap: { enabled: true, scale: 0.75, side: 'right' },
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'auto',
            useShadows: false,
            verticalScrollbarSize: 10,
          },
          lineNumbersMinChars: 3,
          padding: { top: 20, bottom: 20 },
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          contextmenu: true,
          renderLineHighlight: "all",
          bracketPairColorization: { enabled: true },
          guides: { indentation: true },
          folding: true,
          wordWrap: "on"
        }}
      />
    </div>
  </div>
</Card>

        {/* --- Result Visualization Panel --- */}
        <Card className="lg:col-span-5 bg-brand-deep border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden relative border-t-4 border-t-brand-primary/50">
            {!result ? (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-6">
                    <div className="bg-brand-primary/5 p-8 rounded-full border border-brand-primary/10 animate-pulse">
                        <Target className="text-brand-primary opacity-30 w-16 h-16" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-white font-bold text-lg">System Ready</p>
                        <p className="text-slate-500 text-sm max-w-xs">Awaiting source code for security evaluation.</p>
                    </div>
                </div>
            ) : (
                <ScrollArea className="h-full">
                    <div className="p-8 space-y-8">
                        
                        {/* Summary Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-brand-dark/50 p-4 rounded-3xl border border-white/5 text-center space-y-1">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Classification</p>
                                <p className={cn(
                                    "text-2xl font-black tracking-tighter",
                                    result.classification === 'TP' || result.classification === 'TN' ? "text-brand-secondary" : "text-red-400"
                                )}>
                                    {result.classification}
                                </p>
                            </div>
                            <div className="bg-brand-dark/50 p-4 rounded-3xl border border-white/5 text-center space-y-1">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reliability</p>
                                <p className="text-2xl font-black text-brand-primary tracking-tighter">#{result.iteration}</p>
                            </div>
                        </div>

                        {/* Severity Score Card */}
                        <div className="relative p-6 rounded-3xl bg-brand-gradient/10 border border-brand-primary/20 overflow-hidden group">
                             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <ShieldAlert size={80} />
                             </div>
                             <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">AI Security Rating</p>
                             <div className="flex items-end gap-2">
                                <h2 className="text-6xl font-black text-white leading-none">{result.analysis.rating}</h2>
                                <span className="text-slate-400 font-bold text-xl mb-1">/10</span>
                             </div>
                             <p className="text-slate-400 text-xs mt-3 leading-relaxed">
                                High scores indicate secure code, while low scores suggest critical vulnerabilities.
                             </p>
                        </div>

                        <Separator className="bg-white/5" />

                        {/* Vulnerabilities List */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-white flex items-center gap-2">
                                <AlertTriangle size={16} className="text-brand-primary" /> DETECTED ISSUES
                            </h3>
                            {result.analysis.vulnerabilities.map((v: any, i: number) => (
                                <div key={i} className="p-5 rounded-2xl bg-brand-dark/80 border-l-4 border-brand-primary shadow-lg space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-brand-primary text-sm">{v.type}</span>
                                        <Badge className="bg-brand-primary/10 text-brand-primary border-none text-[10px] font-black uppercase">
                                            {v.severity}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">{v.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Suggestions */}
                        <div className="space-y-4 pb-4">
                            <h3 className="text-sm font-black text-white flex items-center gap-2">
                                <Zap size={16} className="text-brand-secondary" /> REFACTORING TIPS
                            </h3>
                            <div className="space-y-3">
                                {result.analysis.suggestions.map((s: string, i: number) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="h-5 w-5 rounded-full bg-brand-secondary/20 flex items-center justify-center shrink-0">
                                            <CheckCircle2 size={12} className="text-brand-secondary" />
                                        </div>
                                        <p className="text-xs text-slate-300 leading-relaxed font-medium">{s}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </ScrollArea>
            )}
        </Card>
      </div>
    </div>
  );
}

// Utility function (if not already in lib/utils)
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}