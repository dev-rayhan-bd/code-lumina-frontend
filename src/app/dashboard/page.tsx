/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, ShieldAlert, CheckCircle2, Zap } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CodeReviewPage() {
  const [code, setCode] = useState("// Paste your Node.js code here...");
  const [result, setResult] = useState<any>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (codeSnippet: string) => {
      const res = await axiosInstance.post("/review/code", { code: codeSnippet });
      return res.data.data;
    },
    onSuccess: (data) => {
      setResult(data);
      toast.success("Analysis Complete!");
    },
  });

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">New Code Audit</h2>
        <Button onClick={() => mutate(code)} disabled={isPending}>
          {isPending ? "Analyzing..." : <><Play className="mr-2" size={16}/> Run Review</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">
        {/* Left Side: Editor */}
        <Card className="overflow-hidden border-slate-200 shadow-sm">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(v) => setCode(v || "")}
            options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 20 } }}
          />
        </Card>

        {/* Right Side: AI Insights */}
  
<Card className="h-full flex flex-col bg-white border-slate-200 shadow-sm overflow-hidden">
  {!result ? (
    <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
      <ShieldAlert size={48} className="opacity-20" />
      <p className="font-medium">Run review to see AI analysis results.</p>
    </div>
  ) : (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        
        {/* Header: Meta Info & Status */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Audit Report</h3>
            <p className="text-xs text-slate-500">Model: {result.modelName}</p>
          </div>
          <Badge variant={result.status === 'verified' ? 'default' : 'secondary'} className="capitalize">
            {result.status}
          </Badge>
        </div>

        {/* Stats Grid: Rating & Iteration */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Reliability Score</p>
            <p className={`text-2xl font-black ${result.analysis.rating < 4 ? 'text-red-500' : 'text-green-500'}`}>
              {result.analysis.rating}/10
            </p>
          </div>
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
            <p className="text-[10px] uppercase font-bold text-primary/60 mb-1">Iteration No.</p>
            <p className="text-2xl font-black text-primary">#{result.iteration}</p>
          </div>
        </div>

        <Separator />

        {/* Vulnerabilities Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold flex items-center gap-2 text-slate-700">
            <ShieldAlert size={16} className="text-red-500" /> Detected Issues ({result.analysis.vulnerabilities.length})
          </h4>
          
          {result.analysis.vulnerabilities.map((v: any, i: number) => (
            <div key={i} className="group relative p-4 border rounded-lg bg-white hover:border-red-200 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm text-slate-900">{v.type}</span>
                <Badge className={
                  v.severity.toLowerCase() === 'critical' || v.severity.toLowerCase() === 'high' 
                  ? 'bg-red-100 text-red-700 hover:bg-red-100 border-none' 
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none'
                }>
                  {v.severity}
                </Badge>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>

        {/* Suggestions Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold flex items-center gap-2 text-slate-700">
            <Zap size={16} className="text-amber-500" /> AI Recommendations
          </h4>
          <div className="space-y-2">
            {result.analysis.suggestions.map((s: string, i: number) => (
              <div key={i} className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                <p className="text-xs text-slate-600 font-medium">{s}</p>
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