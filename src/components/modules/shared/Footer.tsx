import Link from "next/link";
import { Github, Linkedin, Facebook, ShieldCheck } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#05111b] border-t border-white/55 pt-16 pb-8 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Project Info & Socials */}
          <div className="col-span-1 md:col-span-1 space-y-5">
            <Link href={'/'}>
            
            <div className="flex items-center gap-2 font-bold text-2xl group cursor-pointer">
              <div className="bg-brand-primary/10 p-1.5 rounded-lg group-hover:rotate-12 transition-all">
                <ShieldCheck className="text-brand-primary w-6 h-6" />
              </div>
              <span className="tracking-tighter">CodeLumina <span className="text-brand-primary font-light">AI</span></span>
            </div>
            </Link>
            <p className="text-sm text-slate-100 leading-relaxed">
              Evaluating the Accuracy and Reliability of LLM-powered Code Review Systems for Node.js Applications. 
              <br /><span className="text-brand-primary/60 italic text-xs font-medium">A Final Year CSE Thesis.</span>
            </p>
            <div className="flex gap-5 pt-2">
              <a href="https://github.com/Rayhan108" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/rayhan-shorker-6205192b3" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.facebook.com/share/1KcuiMr7Kt" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-primary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Research Details */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-brand-primary">Research</h4>
            <ul className="text-sm space-y-3 text-slate-100 font-medium">
              <li><Link href="/methodology" className="hover:text-white transition-colors underline-offset-4 hover:underline">Accuracy Benchmark</Link></li>
              <li><Link href="/documentation" className="hover:text-white transition-colors underline-offset-4 hover:underline">Reliability Metrics</Link></li>
              <li><Link href="/methodology" className="hover:text-white transition-colors underline-offset-4 hover:underline">Comparative Study</Link></li>
              <li><Link href="/documentation" className="hover:text-white transition-colors underline-offset-4 hover:underline">Dataset Overview</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform Quick Access */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-brand-primary">Platform</h4>
            <ul className="text-sm space-y-3 text-slate-100 font-medium">
              <li><Link href="/dashboard/audit" className="hover:text-white transition-colors underline-offset-4 hover:underline">Code Audit Engine</Link></li>
              <li><Link href="/dashboard/myhistory" className="hover:text-white transition-colors underline-offset-4 hover:underline">History Log</Link></li>
              <li><Link href="/documentation" className="hover:text-white transition-colors underline-offset-4 hover:underline">API Documentation</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors underline-offset-4 hover:underline">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 4: Tech Stack (The Pro Look) */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-brand-primary">Powered By</h4>
            <div className="flex flex-wrap gap-2">
              {["Next.js 15", "Llama 3.3", "Node Js","Typescript","Express JS", "MongoDB", "Groq SDK", "Framer Motion","Tailwindcss","Shadcn UI"].map((stack) => (
                <span key={stack} className="px-3 py-1 bg-brand-accent/30 border border-white/5 text-[10px] font-black rounded-lg uppercase tracking-wider text-slate-500">
                  {stack}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-slate-100 font-medium">
            © 2026 <span className="text-white font-bold tracking-tight">CodeLumina.</span> Developed by <a href="https://github.com/Rayhan108" target="_blank" className="text-brand-primary hover:underline font-black">Md Rayhan</a>
          </p>
          <div className="flex gap-8 text-[11px] font-bold text-slate-100 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};