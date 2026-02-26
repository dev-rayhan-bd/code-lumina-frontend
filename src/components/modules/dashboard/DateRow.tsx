/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hash, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const DataRow = ({ row }: { row: any }) => (
  <TableRow className="border-b border-white/5 hover:bg-white/[0.02] h-20 transition-colors group">
    <TableCell className="font-mono text-xs text-slate-300 pl-10">
      <div className="flex items-center gap-2 font-bold tracking-widest opacity-70">
        <Hash size={12} className="text-brand-primary" /> 
        {row._id.slice(-8)}
      </div>
    </TableCell>
    <TableCell>
      <Badge className={cn(
        "rounded-lg border-none font-black text-[10px] px-3 py-1 shadow-lg",
        row.classification === 'TP' || row.classification === 'TN' 
          ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
          : "bg-red-500/20 text-red-400"
      )}>
        {row.classification}
      </Badge>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-white">{row.analysis.rating}/10</span>
        <div className="h-1 w-12 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
          <div 
            className={cn("h-full", row.analysis.rating < 5 ? "bg-red-500" : "bg-emerald-500")} 
            style={{ width: `${row.analysis.rating * 10}%` }} 
          />
        </div>
      </div>
    </TableCell>
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
      <Button asChild size="sm" className="bg-brand-primary text-brand-dark hover:bg-white font-black rounded-xl h-9 px-5 transition-all group-hover:scale-105">
        <Link href={`/dashboard/history/${row._id}`}>View Details</Link>
      </Button>
    </TableCell>
  </TableRow>
);