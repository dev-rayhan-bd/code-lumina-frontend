/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { 
  Card, CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Search, Filter, Loader2, ExternalLink, 
  CheckCircle2, Calendar, Bug, ChevronLeft, ChevronRight, Code2 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
  const queryClient = useQueryClient();
  
  // States for Filter, Search and Pagination
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [classification, setClassification] = useState("all");
  const limit = 6;

  // ১. ডেটা ফেচিং (Filters & Pagination সহ)
  const { data, isLoading } = useQuery({
    queryKey: ["history", page, search, classification],
    queryFn: async () => {
      let url = `/review/my-history?page=${page}&limit=${limit}&search=${search}`;
      if (classification !== "all") url += `&classification=${classification}`;
      const res = await axiosInstance.get(url);
      return res.data.data;
    },
  });

  // ২. রিভিউ ভেরিফাই করার মিউটেশন
  const verifyMutation = useMutation({
    mutationFn: async (id: string) => await axiosInstance.patch(`/review/verify/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
      toast.success("Audit entry verified by researcher!");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Verification failed"),
  });

  // ৩. সার্চ বা ফিল্টার চেঞ্জ হলে পেজ ১-এ রিসেট করা
  const handleFilterChange = (val: string) => {
    setClassification(val);
    setPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  if (isLoading) return (
    <div className="flex h-[80vh] flex-col items-center justify-center space-y-4">
      <Loader2 className="animate-spin text-brand-primary w-10 h-10" />
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Audit Logs...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">Audit History</h1>
          <p className="text-slate-400 text-sm font-medium">Manage and validate AI detection performance data.</p>
        </div>
        <div className="bg-brand-primary/10 border border-brand-primary/20 px-4 py-2 rounded-xl">
           <span className="text-brand-primary font-black text-xs uppercase tracking-widest">
             Total Logs: {data?.meta?.total || 0}
           </span>
        </div>
      </div>

      {/* --- Smart Filter & Search Bar --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-brand-deep/50 p-3 rounded-[1.5rem] border border-white/5 backdrop-blur-md">
        <div className="md:col-span-8 relative group">
          <Search className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={18} />
          <Input 
            placeholder="Search snippets by keywords..." 
            className="pl-12 h-12 bg-brand-dark border-white/5 text-white rounded-xl focus:ring-brand-primary/20"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="md:col-span-4">
          <Select value={classification} onValueChange={handleFilterChange}>
            <SelectTrigger className="h-12 bg-brand-dark border-white/5 text-slate-300 rounded-xl">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-brand-primary" />
                <SelectValue placeholder="All Classifications" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-brand-deep border-white/10 text-white">
              <SelectItem value="all">All Records</SelectItem>
              <SelectItem value="TP">True Positive (TP)</SelectItem>
              <SelectItem value="TN">True Negative (TN)</SelectItem>
              <SelectItem value="FP">False Positive (FP)</SelectItem>
              <SelectItem value="FN">False Negative (FN)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* --- Data List --- */}
      <div className="grid grid-cols-1 gap-4">
        {data?.result?.length === 0 ? (
           <div className="text-center py-24 bg-brand-deep/20 rounded-[2.5rem] border border-dashed border-white/10">
              <Code2 className="mx-auto text-slate-700 mb-4" size={48} />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No audit logs found matching your criteria</p>
           </div>
        ) : (
          data?.result?.map((item: any) => (
            <Card key={item._id} className="bg-brand-deep border-white/5 p-6 rounded-[2rem] hover:border-brand-primary/30 transition-all group relative">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                
                <div className="space-y-4 flex-1">
                  {/* Item Badge & Meta */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Badge className={cn(
                      "border-none font-black text-[10px] px-3 py-1 rounded-lg tracking-widest",
                      (item.classification === 'TP' || item.classification === 'TN') ? "bg-brand-secondary/10 text-brand-secondary" : "bg-red-400/10 text-red-400"
                    )}>
                      {item.classification}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase">
                      <Calendar size={12} /> {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase">
                      <Bug size={12} /> Rating: {item.analysis.rating}/10
                    </div>
                    {item.isVerified && (
                      <Badge className="bg-brand-secondary text-brand-dark font-black text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={10} /> VERIFIED
                      </Badge>
                    )}
                  </div>

                  {/* Code Snippet Preview */}
                  <div className="relative">
                    <pre className="bg-brand-dark/50 p-5 rounded-2xl text-[11px] text-slate-300 font-mono line-clamp-2 border border-white/5 group-hover:text-white transition-colors overflow-hidden">
                      <code>{item.codeSnippet}</code>
                    </pre>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {!item.isVerified && (
                    <Button 
                      onClick={() => verifyMutation.mutate(item._id)} 
                      disabled={verifyMutation.isPending}
                      className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary hover:text-brand-dark rounded-xl font-bold text-[10px] uppercase px-5 h-10 transition-all"
                    >
                      {verifyMutation.isPending ? "Validating..." : "Verify Result"}
                    </Button>
                  )}
                  <Link href={`/dashboard/history/${item._id}`}>
                    <Button variant="outline" size="icon" className="border-white/5 bg-brand-accent/50 text-slate-400 hover:text-brand-primary hover:border-brand-primary/30 rounded-xl h-10 w-10">
                      <ExternalLink size={18} />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* --- Smart Pagination --- */}
      {data?.meta?.totalPage > 1 && (
        <div className="flex justify-center items-center gap-8 pt-8">
           <Button 
             variant="ghost" 
             disabled={page === 1} 
             onClick={() => setPage(p => p - 1)}
             className="text-slate-400 hover:text-white disabled:opacity-20"
           >
             <ChevronLeft className="mr-2" size={20} /> Previous
           </Button>
           
           <div className="flex items-center gap-2">
              <span className="text-brand-primary font-black font-mono text-lg">{page}</span>
              <span className="text-slate-600 font-bold">/</span>
              <span className="text-slate-400 font-bold font-mono">{data?.meta?.totalPage}</span>
           </div>

           <Button 
             variant="ghost" 
             disabled={page >= data?.meta?.totalPage} 
             onClick={() => setPage(p => p + 1)}
             className="text-slate-400 hover:text-white disabled:opacity-20"
           >
             Next <ChevronRight className="ml-2" size={20} />
           </Button>
        </div>
      )}

    </div>
  );
}