/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, Code2, History, ShieldCheck, 
  ArrowUpRight, Clock, Zap, Target, Loader2, 
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function OverviewPage() {
  // ১. এনালাইটিক্স এবং হিস্ট্রি ডেটা ফেচিং
  const { data: analytics, isLoading: isStatsLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => (await axiosInstance.get("/review/analytics")).data.data,
  });

  const { data: history, isLoading: isHistoryLoading } = useQuery({
    queryKey: ["history"],
    queryFn: async () => (await axiosInstance.get("/review/my-history?limit=5")).data.data.result,
  });

  if (isStatsLoading || isHistoryLoading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="animate-spin text-brand-primary" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* --- Welcome Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter italic uppercase">Dashboard Overview</h1>
          <p className="text-slate-400 text-sm">System status and recent research progress.</p>
        </div>
        <Button className="bg-brand-gradient text-brand-dark font-black rounded-xl" asChild>
          <Link href="/dashboard/audit"><Code2 className="mr-2 h-4 w-4" /> Start New Audit</Link>
        </Button>
      </div>

      {/* --- Quick Stat Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Audits", value: analytics?.metrics?.totalSamples, icon: Activity, color: "text-blue-400" },
          { label: "Precision", value: analytics?.metrics?.precision, icon: Target, color: "text-cyan-400" },
          { label: "Accuracy", value: analytics?.metrics?.accuracy, icon: ShieldCheck, color: "text-emerald-400" },
          { label: "Reliability", value: "High", icon: Zap, color: "text-purple-400" },
        ].map((s, i) => (
          <Card key={i} className="bg-brand-deep border-white/5 rounded-2xl p-6 shadow-xl">
             <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
                  <h3 className={`text-2xl font-black ${s.color}`}>{s.value}</h3>
                </div>
                <s.icon size={20} className="text-slate-600" />
             </div>
          </Card>
        ))}
      </div>

     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
  
  {/* --- Left Column: Recent Audit Logs (8 Columns) --- */}
  <Card className="lg:col-span-8 bg-brand-deep border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-full min-h-[500px]">
    <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between">
      <CardTitle className="text-sm font-black text-white uppercase italic tracking-widest">Recent Audit Logs</CardTitle>
      <Button variant="ghost" size="sm" className="text-xs text-brand-primary" asChild>
         <Link href="/dashboard/history" className="flex items-center gap-2 font-bold uppercase tracking-tighter">
            View All <History size={14} />
         </Link>
      </Button>
    </CardHeader>
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-white/5 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
            <tr>
              <th className="px-8 py-5 border-b border-white/5">Classification</th>
              <th className="px-8 py-5 border-b border-white/5">Rating</th>
              <th className="px-8 py-5 border-b border-white/5">Date</th>
              <th className="px-8 py-5 border-b border-white/5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {history?.map((item: any) => (
              <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-5">
                   <Badge className={cn(
                     "border-none font-black text-[10px] px-3 py-1 rounded-md",
                     item.classification === 'TP' || item.classification === 'TN' ? "bg-emerald-500/10 text-emerald-400" : "bg-red-400/10 text-red-400"
                   )}>{item.classification}</Badge>
                </td>
                <td className="px-8 py-5 font-bold text-slate-200">{item.analysis.rating}/10</td>
                <td className="px-8 py-5 text-slate-500 font-mono text-xs">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-8 py-5 text-center">
                   <Link href="/dashboard/history">
                      <ArrowUpRight className="mx-auto text-slate-600 group-hover:text-brand-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 cursor-pointer" size={20} />
                   </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>

  {/* --- Right Column: Engine & Trend Graph (4 Columns) --- */}
  <div className="lg:col-span-4 flex flex-col gap-8 w-full min-w-0">
    
    {/* Current Engine Card */}
    <Card className="bg-brand-deep border border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative overflow-hidden group transition-all hover:border-brand-primary/30">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl rounded-full -mr-16 -mt-16" />
      <div className="flex items-center gap-5 relative z-10">
        <div className="h-14 w-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <Zap className="text-brand-primary" size={28} />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Current Engine</p>
          <h4 className="text-white font-extrabold text-xl tracking-tight leading-none">Llama-3.3 <span className="text-brand-primary/60 font-medium">70b</span></h4>
        </div>
      </div>
      <Separator className="bg-white/5" />
      <div className="space-y-4 relative z-10 text-sm text-slate-300 font-medium leading-relaxed italic opacity-90">
          &quot;Model latency is currently sub-second. Security audit parameters are optimized for Node.js.&quot;
          <div className="flex items-center gap-2 pt-2">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.15em]">Service Operational</span>
          </div>
      </div>
    </Card>

    {/* --- Trend Graph Card (The Missing Graph) --- */}
    <Card className="bg-brand-dark border border-dashed border-white/10 rounded-[2.5rem] p-8 shadow-xl relative min-h-[220px]">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Audit Load Trend</p>
        <TrendingUp size={14} className="text-brand-primary" />
      </div>
      <div className="h-[120px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={[
            {v:10}, {v:35}, {v:20}, {v:50}, {v:40}, {v:75}, {v:60}
          ]}>
            <defs>
              <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorV)" />
            <Tooltip contentStyle={{backgroundColor: '#0a192f', border: 'none', borderRadius: '10px'}} itemStyle={{color: '#06b6d4'}} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-[10px] text-slate-600 font-bold uppercase mt-4 tracking-tighter">Usage Intensity (Last 7 Days)</p>
    </Card>

  </div>
</div>
    </div>
  );
}