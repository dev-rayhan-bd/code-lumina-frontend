/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, User, Loader2, Maximize2 } from "lucide-react";
import Image from "next/image";

export default function ProfileEditCard({ user, mutation }: any) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewImage = selectedFile || user?.image || "";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedFile(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="bg-brand-deep border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden text-white border-t-4 border-t-brand-primary/50 transition-all duration-500">
      <CardHeader className="bg-brand-accent/20 border-b border-white/5 p-8 text-center sm:text-left">
        <CardTitle className="text-2xl font-black tracking-tight uppercase italic text-brand-primary">Profile Identity</CardTitle>
        <CardDescription className="text-slate-500 font-medium italic">Benchmark your researcher profile status.</CardDescription>
      </CardHeader>
      
      <CardContent className="p-10">
        <form onSubmit={(e) => {
             e.preventDefault();
             const fd = new FormData(e.currentTarget);
             const finalFd = new FormData();
             finalFd.append("body", JSON.stringify({ 
                firstName: fd.get("firstName"), 
                lastName: fd.get("lastName"), 
                contact: fd.get("contact") 
             }));
             if (fileInputRef.current?.files?.[0]) finalFd.append("image", fileInputRef.current.files[0]);
             mutation.mutate(finalFd);
        }} className="space-y-8">
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative cursor-zoom-in group">
                    <div className="absolute -inset-1 bg-brand-gradient rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                    <Avatar className="w-32 h-32 border-4 border-brand-dark relative ring-2 ring-white/10 overflow-hidden bg-brand-accent">
                      <AvatarImage 
                        src={previewImage} 
                        className="object-cover aspect-square" 
                      />
                      <AvatarFallback className="text-4xl font-black bg-brand-accent text-slate-500">
                        {user?.firstName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                       <Maximize2 className="text-white w-6 h-6" />
                    </div>
                  </div>
                </DialogTrigger>
                
                {/* --- IMAGE ERROR FIX HERE --- */}
                <DialogContent className="bg-brand-dark border-white/10 p-0 overflow-hidden rounded-[2.5rem] max-w-md shadow-2xl border-none">
                   <DialogHeader className="hidden"><DialogTitle>Preview</DialogTitle></DialogHeader>
                   <div className="relative aspect-square w-full h-[400px]">
                      <Image 
                        src={previewImage} 
                        alt="Full Preview" 
                        fill 
                        className="object-cover" 
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                   </div>
                </DialogContent>
              </Dialog>

              <Label 
                htmlFor="img-edit" 
                className="absolute bottom-1 right-1 bg-brand-primary text-brand-dark p-2.5 rounded-full cursor-pointer hover:scale-110 transition-all border-4 border-brand-deep shadow-xl z-10"
              >
                <Camera size={16} strokeWidth={3} />
              </Label>
              <input id="img-edit" ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>

            <div className="text-center md:text-left">
              <h4 className="text-2xl font-black text-white tracking-tight">{user?.firstName} {user?.lastName}</h4>
              <p className="text-xs text-brand-primary font-bold uppercase tracking-[0.2em] opacity-60">Verified Node.js Researcher</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">First Name</Label>
              <Input name="firstName" defaultValue={user?.firstName} className="bg-brand-dark/50 border-white/5 h-14 rounded-2xl focus:border-brand-primary/50" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">Last Name</Label>
              <Input name="lastName" defaultValue={user?.lastName} className="bg-brand-dark/50 border-white/5 h-14 rounded-2xl focus:border-brand-primary/50" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">Contact Number</Label>
            <Input name="contact" defaultValue={user?.contact} className="bg-brand-dark/50 border-white/5 h-14 rounded-2xl focus:border-brand-primary/50" />
          </div>

          <Button className="w-full h-14 bg-brand-primary hover:bg-cyan-500 text-brand-dark font-black text-base uppercase tracking-widest shadow-2xl shadow-brand-primary/20 rounded-2xl transition-all active:scale-[0.98]" disabled={mutation.isPending}>
            {mutation.isPending ? <Loader2 className="animate-spin" /> : "Save Profile Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}