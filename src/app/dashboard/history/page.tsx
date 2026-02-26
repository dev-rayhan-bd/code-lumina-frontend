/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, FilterX, ShieldCheck, ChevronRight, Hash, ArrowUpDown, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { reviewService } from "@/services/review.service";

export default function HistoryPage({ isAdmin = true }: { isAdmin?: boolean }) {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<any>({
    classification: "all",
    severity: "all",
    isVerified: "all",
    sort: "-createdAt" // Default: Newest first
  });

  // Query Params তৈরি
  const queryParams: any = {
    page,
    limit: 10,
    sort: filters.sort,
  };
  if (filters.classification !== "all") queryParams.classification = filters.classification;
  if (filters.severity !== "all") queryParams.severity = filters.severity;
  if (filters.isVerified !== "all") queryParams.isVerified = filters.isVerified;

  const { data, isLoading } = useQuery({
    queryKey: ["history", filters, page, isAdmin],
    queryFn: () => reviewService.getHistory(isAdmin, queryParams),
  });

  const resetFilters = () => {
    setFilters({ classification: "all", severity: "all", isVerified: "all", sort: "-createdAt" });
    setPage(1);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">
            {isAdmin ? "Global Index" : "Personal Records"}
          </h1>
          <p className="text-slate-500 text-sm pl-1 font-medium">Research Data Management System</p>
        </div>
        
        {/* Reset Filter - High Contrast Cyan */}
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-dark font-black rounded-xl px-6 h-10 transition-all"
        >
          <FilterX size={16} className="mr-2" /> RESET FILTERS
        </Button>
      </div>

      {/* --- Filter & Sorting Panel --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-brand-deep/50 border border-white/5 rounded-[2rem] backdrop-blur-md">
        <FilterBox label="Classification" value={filters.classification} onValueChange={(v:any) => setFilters({...filters, classification: v})} options={["TP", "TN", "FP", "FN"]} />
        <FilterBox label="Severity" value={filters.severity} onValueChange={(v:any) => setFilters({...filters, severity: v})} options={["Critical", "High", "Medium"]} />
        
        {/* Expert Review - Simplified as per your requirement */}
        <FilterBox label="Expert Review" value={filters.isVerified} onValueChange={(v:any) => setFilters({...filters, isVerified: v})} 
            options={[{l: "Verified Only", v: "true"}, {l: "Pending Review", v: "false"}]} />

        {/* Rating Sorting - New Feature */}
        <FilterBox label="Sort by Rating" value={filters.sort} onValueChange={(v:any) => setFilters({...filters, sort: v})} 
            options={[
    { l: "Newest First", v: "-createdAt" },  
    { l: "Oldest First", v: "createdAt" },
    { l: "Highest Rating", v: "-analysis.rating" }, 
    { l: "Lowest Rating", v: "analysis.rating" }
  ]}  />
      </div>

      {/* --- Data Table --- */}
      <Card className="bg-brand-deep border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden">
        {isLoading ? (
          <div className="p-32 flex justify-center"><Loader2 className="animate-spin text-brand-primary w-10 h-10" /></div>
        ) : (
          <>
            <Table>
              <TableHeader className="bg-brand-accent/40 border-b border-white/5">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="text-[10px] font-black uppercase text-slate-400 pl-10 h-16">Audit ID</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400">Classification</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400">Security Score</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400">Expert Review</TableHead>
                  <TableHead className="text-right pr-10 text-[10px] font-black uppercase text-slate-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.result?.map((row: any) => (
                  <TableRow key={row._id} className="border-b border-white/5 hover:bg-white/[0.02] h-20 transition-colors group">
                    <TableCell className="font-mono text-xs text-slate-300 pl-10 flex items-center gap-2 h-20">
                       <Hash size={12} className="text-brand-primary opacity-50" /> {row._id.slice(-8)}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "rounded-lg border-none font-black text-[10px] px-3 py-1",
                        row.classification === 'TP' || row.classification === 'TN' ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                      )}>{row.classification}</Badge>
                    </TableCell>
                    <TableCell className="text-sm font-bold text-white">{row.analysis.rating}/10</TableCell>
                    <TableCell>
                      {row.isVerified ? (
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[9px] uppercase tracking-wider">
                          <ShieldCheck size={14} /> Verified
                        </div>
                      ) : (
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">In Review</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      {/* Action Button - Fully Visible Cyan */}
                      <Button asChild size="sm" className="bg-brand-primary text-brand-dark hover:bg-white font-black rounded-xl h-9 px-5 transition-all">
                        <Link href={`/dashboard/history/${row._id}`}>View Details</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* --- Pagination Controls --- */}
            <div className="p-6 bg-brand-accent/20 flex items-center justify-between border-t border-white/5">
                <p className="text-xs text-slate-500 font-medium">
                  Showing page <span className="text-white">{data?.meta?.page}</span> of {data?.meta?.totalPage}
                </p>
                <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                      className="border-white/10 text-white hover:bg-white/5 rounded-lg"
                    >
                        <ChevronLeft size={16} /> Prev
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={page >= (data?.meta?.totalPage || 1)}
                      onClick={() => setPage(page + 1)}
                      className="border-white/10 text-white hover:bg-white/5 rounded-lg"
                    >
                        Next <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

// Helper Filter Component
const FilterBox = ({ label, value, onValueChange, options }: any) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-1 opacity-70">
      {label}
    </label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-brand-dark border-white/10 text-white h-11 rounded-xl focus:ring-brand-primary/20 w-full">
 
        <SelectValue placeholder="Select Sort" />
      </SelectTrigger>
      <SelectContent className="bg-brand-deep border-white/10 text-white rounded-xl">
  
        {label !== "Sort" && label !== "Sort by Rating" && (
          <SelectItem value="all">All {label}</SelectItem>
        )}
        
        {options.map((opt: any) => (
          <SelectItem 
            key={opt.v} 
            value={opt.v}
            className="focus:bg-brand-primary focus:text-brand-dark cursor-pointer font-medium"
          >
            {opt.l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);