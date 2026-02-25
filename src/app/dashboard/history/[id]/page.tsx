/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Editor from "@monaco-editor/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bug, Loader2, ShieldCheck, Zap } from "lucide-react";

export default function SingleAuditDetails() {
  const { id } = useParams();
  const router = useRouter();

  const { data: item, isLoading } = useQuery({
    queryKey: ["audit", id],
    queryFn: async () => (await axiosInstance.get(`/review/${id}`)).data.data,
  });

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-primary" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <Button variant="ghost" onClick={() => router.back()} className="text-slate-400 hover:text-white">
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to History
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Code Viewer */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="bg-brand-dark border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="bg-brand-accent/30 px-8 py-4 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-white font-bold text-sm italic uppercase tracking-widest">Submitted Snippet</h3>
              <Badge variant="outline" className="border-brand-primary/30 text-brand-primary font-mono">{item.classification}</Badge>
            </div>
            <Editor height="500px" theme="vs-dark" defaultLanguage="javascript" value={item.codeSnippet} options={{ readOnly: true, fontSize: 14 }} />
          </Card>
        </div>

        {/* Right: AI Report Detail */}
        <div className="lg:col-span-5 space-y-6">
           <Card className="bg-brand-deep border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
              <div className="text-center space-y-4 mb-8">
                <div className={`text-5xl font-black ${item.analysis.rating < 5 ? 'text-red-400' : 'text-emerald-400'}`}>
                   {item.analysis.rating}<span className="text-lg opacity-30">/10</span>
                </div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.3em]">AI Security Score</p>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Bug size={14} className="text-brand-primary" /> Vulnerability Breakdown
                </h4>
                {item.analysis.vulnerabilities.map((v: any, i: number) => (
                   <div key={i} className="p-5 bg-brand-dark rounded-2xl border-l-4 border-brand-primary space-y-2 shadow-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white text-sm">{v.type}</span>
                        <Badge className="bg-brand-primary/10 text-brand-primary border-none text-[9px] font-black">{v.severity}</Badge>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{v.description}</p>
                   </div>
                ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}