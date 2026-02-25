/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Loader2,
  TrendingUp,
  Target,
  Activity,
  ShieldCheck,
  HelpCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await axiosInstance.get("/review/analytics");
      return res.data.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-brand-primary w-12 h-12" />
        <p className="text-slate-300 font-bold uppercase tracking-widest text-xs">
          Generating Research Metrics...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="text-red-400 p-10">
        Failed to load research data. Please check connection.
      </div>
    );

  // Data Formatting: Converting string percentages to numbers for Recharts
  const pieData = [
    { name: "True Positives (TP)", value: data.counts.TP, color: "#06b6d4" },
    { name: "True Negatives (TN)", value: data.counts.TN, color: "#10b981" },
    { name: "False Positives (FP)", value: data.counts.FP, color: "#f59e0b" },
    { name: "False Negatives (FN)", value: data.counts.FN, color: "#ef4444" },
  ];

  const metricsData = [
    { name: "Accuracy", value: parseFloat(data.metrics.accuracy) || 0 },
    { name: "Precision", value: parseFloat(data.metrics.precision) || 0 },
    { name: "Recall", value: parseFloat(data.metrics.recall) || 0 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/5 pb-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase flex items-center gap-3">
            <Activity className="text-brand-primary" /> RESEARCH ANALYTICS
          </h1>
          <p className="text-slate-300 text-sm font-medium italic">
            Llama-3.3 Security Evaluation Framework
          </p>
        </div>
        <div className="bg-brand-primary/10 border border-brand-primary/20 px-6 py-2 rounded-2xl">
          <span className="text-emerald-400 font-black text-sm uppercase tracking-widest">
            Samples: {data.metrics.totalSamples}
          </span>
        </div>
      </div>

      {/* --- KPI Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Accuracy",
            value: data.metrics.accuracy,
            icon: Target,
            color: "text-cyan-400",
          },
          {
            label: "Precision",
            value: data.metrics.precision,
            icon: ShieldCheck,
            color: "text-emerald-400",
          },
          {
            label: "Recall",
            value: data.metrics.recall,
            icon: TrendingUp,
            color: "text-blue-400",
          },
        ].map((m, i) => (
          <Card
            key={i}
            className="bg-brand-deep border-white/5 shadow-2xl rounded-[2rem] group hover:border-brand-primary/30 transition-all"
          >
            <CardContent className="p-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {m.label}
                </p>
                <h3
                  className={cn(
                    "text-4xl font-black tracking-tighter",
                    m.color,
                  )}
                >
                  {m.value}
                </h3>
              </div>
              <div className="bg-white/5 p-4 rounded-3xl group-hover:scale-110 transition-transform">
                <m.icon className={cn("w-8 h-8", m.color)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- Visualizations --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Confusion Matrix Pie Chart */}
        <Card className="bg-brand-deep border-white/5 rounded-[2.5rem] p-8">
          <CardHeader className="p-0 mb-8 flex justify-between items-start">
            <div>
              <CardTitle className="text-sm font-black text-slate-400 uppercase tracking-widest">
                Confusion Matrix
              </CardTitle>
              <CardDescription className="text-xs text-slate-600">
                Distribution of detection outcomes
              </CardDescription>
            </div>
            <Info size={16} className="text-slate-700" />
          </CardHeader>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0a192f",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    padding: "10px",
                  }}
                  itemStyle={{
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Evaluation Score Bar Chart */}
        <Card className="bg-brand-deep border-white/5 rounded-[2.5rem] p-8">
          <CardHeader className="p-0 mb-8">
            <CardTitle className="text-sm font-black text-slate-400 uppercase tracking-widest">
              Model Performance (%)
            </CardTitle>
            <CardDescription className="text-xs text-slate-600">
              Statistical analysis of audit results
            </CardDescription>
          </CardHeader>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metricsData}>
                <XAxis
                  dataKey="name"
                  stroke="#475569"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#475569"
                  fontSize={12}
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  contentStyle={{
                    backgroundColor: "#0a192f",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                  itemStyle={{
                    color: "#06b6d4", // matrix
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                  labelStyle={{
                    color: "#ffffff", //header
                    marginBottom: "4px",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#06b6d4"
                  radius={[12, 12, 0, 0]}
                  barSize={55}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* --- Understanding the Metrics (English Guide) --- */}
      <div className="bg-brand-accent/20 border border-brand-primary/10 rounded-[3rem] p-10 space-y-10">
        <div className="flex items-center gap-3 border-b border-white/44 pb-4">
          <HelpCircle className="text-brand-primary w-6 h-6" />
          <h4 className="text-xl font-bold text-white uppercase tracking-tighter italic">
            Guide: Understanding the Research Data
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left side: Outcomes */}
          <div className="space-y-8">
            <div className="flex gap-5">
              <div className="h-10 w-10 rounded-xl bg-cyan-400/10 flex items-center justify-center shrink-0 font-bold text-cyan-400">
                TP
              </div>
              <div>
                <h5 className="text-white font-bold text-sm">
                  True Positive (Successful Detection)
                </h5>
                <p className="text-xs text-slate-100 leading-relaxed">
                  The code was vulnerable, and the AI correctly identified the
                  bug. Higher TP indicates a strong security engine.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="h-10 w-10 rounded-xl bg-emerald-400/10 flex items-center justify-center shrink-0 font-bold text-emerald-400">
                TN
              </div>
              <div>
                <h5 className="text-white font-bold text-sm">
                  True Negative (Correct Assurance)
                </h5>
                <p className="text-xs text-slate-100 leading-relaxed">
                  The code was safe, and the AI correctly confirmed it as
                  secure. This proves the AI&apos;s ability to avoid unnecessary
                  panic.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="h-10 w-10 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0 font-bold text-amber-400">
                FP
              </div>
              <div>
                <h5 className="text-white font-bold text-sm">
                  False Positive (False Alarm)
                </h5>
                <p className="text-xs text-slate-100 leading-relaxed">
                  The code was safe, but the AI incorrectly flagged a bug. High
                  FP leads to developer fatigue and &quot;Hallucinations&quot;.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="h-10 w-10 rounded-xl bg-red-400/10 flex items-center justify-center shrink-0 font-bold text-red-400">
                FN
              </div>
              <div>
                <h5 className="text-white font-bold text-sm">
                  False Negative (Failed Detection)
                </h5>
                <p className="text-xs text-slate-100 leading-relaxed text-red-300/80">
                  The code was dangerous, but the AI missed it entirely. This is
                  the most critical failure in security auditing.
                </p>
              </div>
            </div>
          </div>

          {/* Right side: Performance Metrics */}
          <div className="bg-brand-dark/50 p-8 rounded-[2.5rem] border border-white/5 space-y-8 flex flex-col justify-center">
            <div className="space-y-2">
              <h5 className="text-brand-primary font-bold text-sm flex items-center gap-2 underline underline-offset-8">
                1. Accuracy
              </h5>
              <p className="text-[11px] text-slate-100">
                Overall ratio of correct decisions (TP + TN) out of all tests
                conducted.
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="text-brand-primary font-bold text-sm flex items-center gap-2 underline underline-offset-8">
                2. Precision
              </h5>
              <p className="text-[11px] text-slate-100">
                Trustworthiness of bug reports. When AI says there is a bug, how
                likely is it to be true?
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="text-brand-primary font-bold text-sm flex items-center gap-2 underline underline-offset-8">
                3. Recall
              </h5>
              <p className="text-[11px] text-slate-100">
                The ability of the AI to find 100% of existing vulnerabilities
                without missing any (FN).
              </p>
            </div>
            <div className="pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] text-brand-secondary font-black uppercase tracking-widest animate-pulse">
                Goal: Reach 100% for all metrics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
