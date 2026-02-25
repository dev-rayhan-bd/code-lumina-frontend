/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Loader2, Code2, Target, ShieldAlert, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function AuditPage() {
  const [code, setCode] = useState("// Paste Node.js code here...");
  const [gt, setGt] = useState("Vulnerable");
  const [result, setResult] = useState<any>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.post("/review/code", payload);
      return res.data.data;
    },
    onSuccess: (data) => {
      setResult(data);
 
      queryClient.invalidateQueries({ queryKey: ["history"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast.success(`Classified as ${data.classification}`);
    },
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
       {/* --- Top Actions --- */}
       <div className="flex justify-between items-center bg-brand-deep/30 p-4 rounded-[2rem] border border-white/5 backdrop-blur-md">
          <h1 className="text-xl font-black text-white italic pl-4">AUDIT ENGINE</h1>
          <div className="flex items-center gap-4">
            <Select value={gt} onValueChange={setGt}>
              <SelectTrigger className="w-32 bg-brand-dark border-white/10 text-brand-primary font-bold rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-brand-deep text-white border-white/10">
                <SelectItem value="Vulnerable">Vulnerable</SelectItem>
                <SelectItem value="Safe">Safe</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => mutate({ code, groundTruth: gt })} disabled={isPending} className="bg-brand-gradient text-brand-dark font-black px-8 rounded-xl shadow-lg shadow-brand-primary/20 transition-all hover:scale-105">
              {isPending ? <Loader2 className="animate-spin" /> : <><Play size={16} className="mr-2" /> RUN</>}
            </Button>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
          {/* VS Code Style Editor */}
          <Card className="lg:col-span-7 bg-[#1e1e1e] border-white/5 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col">
             <div className="bg-[#252526] px-6 py-3 border-b border-black/20 flex justify-between items-center text-[10px] text-slate-500 font-mono tracking-widest">
                <span>INDEX.JS</span>
                <div className="flex gap-2"><div className="w-2 h-2 rounded-full bg-red-500/20"/><div className="w-2 h-2 rounded-full bg-yellow-500/20"/><div className="w-2 h-2 rounded-full bg-green-500/20"/></div>
             </div>
             <Editor height="100%" defaultLanguage="javascript" theme="vs-dark" value={code} onChange={(v) => setCode(v || "")} options={{ fontSize: 14, minimap: { enabled: false } }} />
          </Card>

          {/* Result Panel */}
          <Card className="lg:col-span-5 bg-brand-deep border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden relative border-t-4 border-t-brand-primary/50">
             {!result ? (
               <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-30"><Target size={60} className="mb-4" /><p className="font-bold">AWAITING CODE</p></div>
             ) : (
               <ScrollArea className="h-full">
                  <div className="p-8 space-y-8">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-brand-dark/50 p-4 rounded-3xl border border-white/5 text-center">
                          <p className="text-[10px] font-black text-slate-500 uppercase">Classification</p>
                          <p className="text-2xl font-black text-brand-primary">{result.classification}</p>
                        </div>
                        <div className="bg-brand-dark/50 p-4 rounded-3xl border border-white/5 text-center">
                          <p className="text-[10px] font-black text-slate-500 uppercase">Reliability</p>
                          <p className="text-2xl font-black text-brand-primary">#{result.iteration}</p>
                        </div>
                     </div>
                     {/* Severity Score */}
                     <div className="p-6 rounded-3xl bg-brand-primary/5 border border-brand-primary/20 text-center">
                        <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">Security Rating</p>
                        <h2 className="text-6xl font-black text-white">{result.analysis.rating}<span className="text-lg opacity-30">/10</span></h2>
                     </div>
                     {/* Detected Issues */}
                     <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest"><AlertTriangle size={14} /> Issues</h3>
                        {result.analysis.vulnerabilities.map((v: any, i: number) => (
                          <div key={i} className="p-5 rounded-2xl bg-brand-dark/80 border-l-4 border-brand-primary space-y-2">
                             <div className="flex justify-between items-center"><span className="font-bold text-brand-primary text-sm">{v.type}</span><Badge className="bg-brand-primary/10 text-brand-primary border-none text-[9px]">{v.severity}</Badge></div>
                             <p className="text-xs text-slate-400 leading-relaxed">{v.description}</p>
                          </div>
                        ))}
                     </div>
                  </div>
               </ScrollArea>
             )}
          </Card>
       </div>
    </div>
  );
}