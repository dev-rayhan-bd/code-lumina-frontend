/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send, Mail, UserCheck } from "lucide-react";
import { contactService } from "@/services/contact.services";

export default function ContactPage() {
  const mutation = useMutation({
    mutationFn: (data: any) => contactService.sendMessage(data),
    onSuccess: () => {
      toast.success("Inquiry sent! We will get back to you via your registered email.");
      (document.getElementById("contact-form") as HTMLFormElement).reset();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Login required"),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(Object.fromEntries(new FormData(e.currentTarget)));
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 pt-24">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full" />

      <Card className="w-full max-w-xl bg-brand-deep border-white/5 shadow-2xl text-white relative z-10">
        <CardHeader className="text-center space-y-2 pb-8">
          <div className="bg-brand-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-brand-primary/20">
            <Mail className="text-brand-primary w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight">Contact Researcher</CardTitle>
          <div className="flex items-center justify-center gap-2 text-xs text-brand-primary font-bold uppercase tracking-widest opacity-70">
            <UserCheck size={14} /> Sending as registered user
          </div>
        </CardHeader>
        <CardContent>
          <form id="contact-form" onSubmit={onSubmit} className="space-y-5">
            <Input name="subject" placeholder="Subject" className="h-12 bg-brand-accent border-none text-white" required />
            <Textarea name="message" placeholder="Describe your question or feedback..." className="min-h-[150px] bg-brand-accent border-none text-white resize-none" required />
            <Button className="w-full h-12 bg-brand-primary hover:bg-cyan-500 text-brand-dark font-black text-lg" disabled={mutation.isPending}>
              {mutation.isPending ? <Loader2 className="animate-spin" /> : <><Send size={18} className="mr-2"/> Send Message</>}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}