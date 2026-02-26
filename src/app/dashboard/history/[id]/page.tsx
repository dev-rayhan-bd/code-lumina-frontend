/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Editor from "@monaco-editor/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft, Bug, Loader2, ShieldCheck, Zap, 
  RotateCcw, Target, Info, CheckCircle2, AlertCircle, 
  Repeat
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function SingleAuditDetails() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: item, isLoading } = useQuery({
    queryKey: ["audit", id],
    queryFn: async () => (await axiosInstance.get(`/review/${id}`)).data.data,
  });

  // Expert Verification Mutation
  const verifyMutation = useMutation({
    mutationFn: async () => await axiosInstance.patch(`/review/verify/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audit", id] });
      toast.success("Audit manually verified by researcher.");
    }
  });

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-brand-dark"><Loader2 className="animate-spin text-brand-primary w-10 h-10" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* --- Top Action Bar --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()} className="text-white hover:text-white hover:bg-white/5 rounded-full">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Research History
        </Button>
        
        {!item.isVerified && (
          <Button 
            onClick={() => verifyMutation.mutate()} 
            disabled={verifyMutation.isPending}
            className="bg-brand-secondary/20 text-white border border-brand-secondary/30 hover:bg-brand-secondary hover:text-brand-dark font-bold rounded-full px-6"
          >
            {verifyMutation.isPending ? <Loader2 className="animate-spin" /> : <><ShieldCheck className="mr-2 w-4 h-4" /> Verify Result</>}
          </Button>
        )}
        {item.isVerified && (
          <Badge className="bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20 py-1.5 px-4 rounded-full flex gap-2">
            <CheckCircle2 size={14} /> Expert Verified
          </Badge>
        )}
      </div>

      {/* --- Research Metadata Summary --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: "Model Engine", value: item.modelName, icon: Info },
           { label: "Ground Truth", value: item.groundTruth, icon: Target, color: item.groundTruth === 'Vulnerable' ? 'text-red-400' : 'text-emerald-400' },
           { label: "Classification", value: item.classification, icon: RotateCcw, color: 'text-brand-primary' },
           { label: "Iteration No", value: `#${item.iteration}`, icon: Repeat, color: 'text-white' },
         ].map((stat, i) => (
           <Card key={i} className="bg-brand-deep border-white/5 p-4 flex flex-col items-center justify-center space-y-1 text-center shadow-xl">
             <stat.icon size={14} className="text-slate-500 mb-1" />
             <p className="text-[9px] uppercase font-black text-slate-500 tracking-widest">{stat.label}</p>
             <p className={cn("text-sm font-bold tracking-tight", stat.color || "text-white")}>{stat.value}</p>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- Left: VS Code Style Viewer --- */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="bg-[#1e1e1e] border-none rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/5">
            <div className="bg-[#252526] px-6 py-3 flex items-center justify-between border-b border-black/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]/50" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/50" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]/50" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Source Snippet</span>
            </div>
            <Editor 
              height="550px" 
              theme="vs-dark" 
              defaultLanguage="javascript" 
              value={item.codeSnippet} 
              options={{ 
                readOnly: true, 
                fontSize: 14, 
                minimap: { enabled: false },
                padding: { top: 20 }
              }} 
            />
          </Card>
        </div>

        {/* --- Right: Scientific AI Report --- */}
        <div className="lg:col-span-5 space-y-6">
           <Card className="bg-brand-deep border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden border-t-4 border-t-brand-primary/50">
              <ScrollArea className="h-[610px]">
                <div className="p-8 space-y-8">
                  {/* Security Rating */}
                  <div className="text-center p-6 bg-brand-dark/50 rounded-3xl border border-white/5">
                    <div className={cn(
                      "text-6xl font-black mb-2",
                      item.analysis.rating < 5 ? 'text-red-500' : 'text-emerald-500'
                    )}>
                       {item.analysis.rating}<span className="text-xl opacity-30">/10</span>
                    </div>
                    <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.3em]">Overall Security Rating</p>
                  </div>

                  {/* Vulnerability Details */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                       <Bug size={16} className="text-brand-primary" /> Vulnerabilities Found
                    </h4>
                    {item.analysis.vulnerabilities.map((v: any, i: number) => (
                       <div key={i} className="p-5 bg-brand-dark/80 rounded-2xl border-l-4 border-brand-primary space-y-3 shadow-lg">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-brand-primary text-sm leading-tight">{v.type || "General Security Risk"}</span>
                            <Badge className="bg-red-500/10 text-red-500 border-none text-[9px] font-black uppercase">{v.severity}</Badge>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed italic">&quot;{v.description}&quot;</p>
                          {v.location && (
                             <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono bg-white/5 p-1.5 rounded-md w-fit">
                               <AlertCircle size={10} /> Location: {v.location}
                             </div>
                          )}
                          <div className="pt-2">
                             <p className="text-[10px] font-bold text-brand-secondary uppercase mb-1">Direct Fix:</p>
                             <p className="text-[11px] text-slate-300 leading-relaxed bg-brand-accent/30 p-3 rounded-xl border border-white/5">{v.suggestion}</p>
                          </div>
                       </div>
                    ))}
                  </div>

                  <Separator className="bg-white/5" />

                  {/* High Level Suggestions */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                       <Zap size={16} className="text-brand-secondary" /> Model Recommendations
                    </h4>
                    <div className="space-y-3">
                      {item.analysis.suggestions.map((s: string, i: number) => (
                         <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div className="h-5 w-5 rounded-full bg-brand-secondary/20 flex items-center justify-center shrink-0">
                               <CheckCircle2 size={12} className="text-brand-secondary" />
                            </div>
                            <p className="text-[11px] text-slate-300 font-medium leading-relaxed">{s}</p>
                         </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
           </Card>
        </div>

      </div>
    </div>
  );
}