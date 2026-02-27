/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Loader2,
  Send,
  Mail,
  UserCheck,
  MapPin,
  ShieldCheck,
  Github,
} from "lucide-react";

import { motion } from "framer-motion";
import { contactService } from "@/services/contact.services";

export default function ContactPage() {
  const mutation = useMutation({
    mutationFn: (data: any) => contactService.sendMessage(data),
    onSuccess: () => {
      toast.success("Inquiry received!", {
        description: "We will respond to your registered email soon.",
      });
      (document.getElementById("contact-form") as HTMLFormElement).reset();
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Login required"),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(Object.fromEntries(new FormData(e.currentTarget)));
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-32 pb-20 relative overflow-hidden">
      {/* --- Background Decorative Elements --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[150px] rounded-full -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-secondary/10 blur-[120px] rounded-full -ml-20 -mb-20" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* --- Left Side: Research Info --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs">
                Contact Researcher
              </h2>
              <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter text-white">
                LET&apos;S TALK <br />{" "}
                <span className="text-brand-primary">SCIENCE.</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md font-medium">
                Have questions about the LLM accuracy metrics or want to
                contribute to the dataset? Drop a message.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: MapPin, t: "Base", d: "Dhaka, Bangladesh" },
                { icon: Mail, t: "Email", d: "raihanshorker56@gmail.com" },
                { icon: Github, t: "Github", d: "https://github.com/Rayhan108" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="bg-brand-accent/50 p-3 rounded-2xl border border-white/5 group-hover:border-brand-primary/50 transition-colors">
                    <item.icon className="text-brand-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {item.t}
                    </p>
                    <p className="text-slate-200 font-bold">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- Right Side: Premium Contact Card --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-1 bg-gradient-to-br from-brand-primary/20 via-white/5 to-brand-secondary/20 rounded-[3rem] shadow-2xl">
              <div className="bg-brand-deep/90 backdrop-blur-2xl rounded-[2.9rem] p-8 md:p-12 border border-white/5 relative overflow-hidden">
                {/* Status Indicator */}
                <div className="flex items-center gap-2 mb-10 bg-brand-primary/10 w-fit px-4 py-1.5 rounded-full border border-brand-primary/20">
                  <UserCheck
                    size={14}
                    className="text-brand-primary animate-pulse"
                  />
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">
                    Validated User Access
                  </span>
                </div>

                <form
                  id="contact-form"
                  onSubmit={onSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Subject
                    </label>
                    <Input
                      name="subject"
                      placeholder="e.g. Model Hallucination Report"
                      className="h-14 bg-brand-dark border-white/5 text-white rounded-2xl focus:border-brand-primary/50 transition-all text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Message Detail
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Share your feedback or inquiry here..."
                      className="min-h-[180px] bg-brand-dark border-white/5 text-white rounded-3xl p-5 focus:border-brand-primary/50 transition-all text-sm resize-none"
                      required
                    />
                  </div>

                  <Button
                    className="w-full h-14 bg-brand-primary hover:bg-cyan-500 text-brand-dark font-black text-base uppercase tracking-widest shadow-xl shadow-brand-primary/20 transition-all active:scale-[0.98] rounded-2xl"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="animate-spin mr-2" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" /> Dispatch Message
                      </>
                    )}
                  </Button>
                </form>

                {/* Bottom decorative seal */}
                <div className="absolute -bottom-6 -right-6 opacity-5 rotate-12">
                  <ShieldCheck size={150} className="text-brand-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
