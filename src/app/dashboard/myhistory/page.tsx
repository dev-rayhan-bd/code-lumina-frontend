/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { reviewService } from "@/services/review.service";
import { FilterDropdown } from "@/components/modules/dashboard/FilterDropdown";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, FilterX, UserCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { DataRow } from "@/components/modules/dashboard/DateRow";

export default function MyHistoryPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<any>({
    classification: "all",
    severity: "all",
    isVerified: "all",
    sort: "-createdAt" 
  });

  const queryParams: any = {
    page,
    limit: 10,
    sort: filters.sort
  };

  if (filters.classification !== "all") queryParams.classification = filters.classification;
  if (filters.severity !== "all") queryParams.severity = filters.severity;
  if (filters.isVerified !== "all") queryParams.isVerified = filters.isVerified;

  const { data, isLoading } = useQuery({
    queryKey: ["my-history", filters, page],
    queryFn: () => reviewService.getHistory(false, queryParams),
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white italic tracking-tighter flex items-center gap-3">
             <UserCircle className="text-brand-primary w-8 h-8" /> MY HISTORY
          </h1>
          <p className="text-slate-500 text-sm">Review your personal code audit records.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => { setFilters({ classification: "all", severity: "all", isVerified: "all", sort: "-createdAt" }); setPage(1); }} 
          className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-dark font-black rounded-xl h-10 px-6 transition-all"
        >
          <FilterX size={16} className="mr-2" /> RESET FILTERS
        </Button>
      </div>

      {/* Filter Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-brand-deep/50 border border-white/5 rounded-[2rem] backdrop-blur-md">
        <FilterDropdown label="Classification" value={filters.classification} onValueChange={(v) => setFilters({...filters, classification: v})} options={["TP", "TN", "FP", "FN"]} />
        <FilterDropdown label="Severity" value={filters.severity} onValueChange={(v) => setFilters({...filters, severity: v})} options={["Critical", "High", "Medium"]} />
        <FilterDropdown label="Expert Review" value={filters.isVerified} onValueChange={(v) => setFilters({...filters, isVerified: v})} options={[{l: "Verified Only", v: "true"}, {l: "Pending Review", v: "false"}]} />
        <FilterDropdown 
          label="Sort by Rating" 
          value={filters.sort} 
          onValueChange={(v) => setFilters({...filters, sort: v})} 
          options={[
            {l: "Newest First", v: "-createdAt"},
            {l: "Highest Rating", v: "-analysis.rating"},
            {l: "Lowest Rating", v: "analysis.rating"}
          ]} 
        />
      </div>

      <Card className="bg-brand-deep border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden">
        {isLoading ? (
          <div className="p-32 flex justify-center"><Loader2 className="animate-spin text-brand-primary w-10 h-10" /></div>
        ) : (
          <>
            <Table>
              <TableHeader className="bg-brand-accent/40 border-b border-white/5">
                <TableRow className="hover:bg-transparent border-none h-16">
                  <TableHead className="text-[10px] font-black uppercase text-slate-400 pl-10">Audit ID</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400">Result</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400">Score</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-slate-400">Verified</TableHead>
                  <TableHead className="text-right pr-10 text-[10px] font-black uppercase text-slate-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.result?.length > 0 ? (
                    data.result.map((row: any) => <DataRow key={row._id} row={row} />)
                ) : (
                    <TableRow><TableCell colSpan={5} className="h-60 text-center text-slate-600 font-bold uppercase text-xs tracking-widest">No matching records found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="p-6 bg-brand-accent/20 flex items-center justify-between border-t border-white/5">
                <p className="text-xs text-slate-500 font-medium">Page <span className="text-white">{data?.meta?.page || 1}</span> of {data?.meta?.totalPage || 1}</p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)} className="border-white/10 text-white hover:bg-white/5">
                        <ChevronLeft size={16} /> Prev
                    </Button>
                    <Button variant="outline" size="sm" disabled={page >= (data?.meta?.totalPage || 1)} onClick={() => setPage(page + 1)} className="border-white/10 text-white hover:bg-white/5">
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