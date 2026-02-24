/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Send, Mail, UserCheck } from "lucide-react";
import { contactService } from "@/services/contact.services";

export default function ContactPage() {
  const mutation = useMutation({
    mutationFn: (data: { subject: string; message: string }) => 
      contactService.sendMessage(data),
    onSuccess: (res) => {
      toast.success("Message sent using your account email!");
      (document.getElementById("contact-form") as HTMLFormElement).reset();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Login required to send message.");
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate({
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <Card className="w-full max-w-xl shadow-2xl border-none ring-1 ring-slate-200">
        <CardHeader className="text-center">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="text-primary w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight">Contact Researcher</CardTitle>
          <CardDescription className="flex items-center justify-center gap-2 mt-2">
            <UserCheck size={14} className="text-green-500" />
            Sending as your registered account email
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form id="contact-form" onSubmit={onSubmit} className="space-y-6">
 
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Subject</label>
              <Input name="subject" placeholder="Methodology Feedback / Bug Report" className="h-12" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Message</label>
              <Textarea 
                name="message" 
                placeholder="Write your message here..." 
                className="min-h-[150px] resize-none border-slate-200 focus:border-primary transition-all" 
                required 
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Loader2 className="animate-spin" /> : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}