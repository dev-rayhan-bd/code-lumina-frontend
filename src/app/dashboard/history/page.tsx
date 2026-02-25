/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle2, Search, Filter, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const res = await axiosInstance.get("/review/my-history");
      return res.data.data.result;
    }
  });

  const verifyMutation = useMutation({
    mutationFn: async (id: string) => await axiosInstance.patch(`/review/verify/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
      toast.success("Verified by researcher!");
    }
  });

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-brand-primary" /></div>;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
         <div><h1 className="text-3xl font-black text-white italic">AUDIT HISTORY</h1><p className="text-slate-500 text-sm">Review previous evaluations and expert validations.</p></div>
      </div>

      <div className="grid gap-4">
        {data?.map((item: any) => (
          <Card key={item._id} className="bg-brand-deep border-white/5 p-6 rounded-3xl hover:border-brand-primary/30 transition-all group">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <Badge className="bg-brand-primary/10 text-brand-primary border-none font-black text-[10px]">{item.classification}</Badge>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</span>
                  {item.isVerified && <CheckCircle2 className="text-brand-secondary w-4 h-4" />}
                </div>
                <h3 className="text-white font-bold text-lg line-clamp-1 opacity-80 group-hover:opacity-100">{item.codeSnippet}</h3>
                <div className="flex gap-4">
                   <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Model: {item.modelName}</div>
                   <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Rating: {item.analysis.rating}/10</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {!item.isVerified && (
                  <Button size="sm" onClick={() => verifyMutation.mutate(item._id)} className="bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20 hover:bg-brand-secondary hover:text-brand-dark rounded-xl font-bold text-xs uppercase">
                    Verify Now
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white"><ExternalLink size={18} /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}