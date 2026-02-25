/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await axiosInstance.get("/review/analytics");
      return res.data.data;
    }
  });

  if (isLoading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="animate-spin text-brand-primary" /></div>;

  const pieData = [
    { name: "TP", value: data.counts.TP, color: "#06b6d4" },
    { name: "TN", value: data.counts.TN, color: "#10b981" },
    { name: "FP", value: data.counts.FP, color: "#f59e0b" },
    { name: "FN", value: data.counts.FN, color: "#ef4444" },
  ];

  const barData = [
    { name: "Accuracy", value: parseFloat(data.metrics.accuracy) },
    { name: "Precision", value: parseFloat(data.metrics.precision) },
    { name: "Recall", value: parseFloat(data.metrics.recall) },
  ];

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-3xl font-black text-white italic">RESEARCH ANALYTICS</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-brand-deep border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
          <CardHeader><CardTitle className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black">Confusion Matrix Distribution</CardTitle></CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value">
                  {pieData.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: '#0a192f', border: 'none', borderRadius: '15px'}} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-brand-deep border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
          <CardHeader><CardTitle className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black">Performance Benchmarks (%)</CardTitle></CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#475569" fontSize={10} fontVariant="bold" />
                <YAxis stroke="#475569" fontSize={10} domain={[0, 100]} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#0a192f', border: 'none', borderRadius: '15px'}} />
                <Bar dataKey="value" fill="#06b6d4" radius={[15, 15, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(data.metrics).map(([key, val]: any) => (
           <Card key={key} className="bg-brand-accent/20 border-white/5 p-6 rounded-3xl text-center">
              <p className="text-[9px] font-black text-brand-primary uppercase tracking-widest">{key}</p>
              <h2 className="text-3xl font-black text-white mt-1">{val}</h2>
           </Card>
        ))}
      </div>
    </div>
  );
}