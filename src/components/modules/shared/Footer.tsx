import Link from "next/link";
import {  Github, Linkedin, Twitter, ShieldCheck } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#05111b] border-t pt-16 pb-8 ">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Info */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-white">
              <ShieldCheck className="text-white w-6 h-6" />
              <span>CodeLumina AI</span>
            </div>
            <p className="text-sm text-white leading-relaxed">
              Evaluating the Accuracy and Reliability of LLM-powered Code Review Systems for Node.js Applications.
            </p>
            <div className="flex gap-4">
              <Github className="w-5 h-5 text-white hover:text-primary cursor-pointer" />
              <Linkedin className="w-5 h-5 text-white hover:text-primary cursor-pointer" />
              <Twitter className="w-5 h-5 text-white hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Column 2: Thesis Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Research</h4>
            <ul className="text-sm space-y-2 text-white">
              <li><Link href="#" className="hover:text-primary">Accuracy Benchmark</Link></li>
              <li><Link href="#" className="hover:text-primary">Reliability Metrics</Link></li>
              <li><Link href="#" className="hover:text-primary">Comparative Study</Link></li>
              <li><Link href="#" className="hover:text-primary">Dataset Overview</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900">Platform</h4>
            <ul className="text-sm space-y-2 text-white">
              <li><Link href="/login" className="hover:text-primary">Code Audit</Link></li>
              <li><Link href="#" className="hover:text-primary">History Log</Link></li>
              <li><Link href="#" className="hover:text-primary">API Docs</Link></li>
              <li><Link href="#" className="hover:text-primary">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 4: Tech Stack Badge */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Powered By</h4>
            <div className="flex flex-wrap gap-2">
              {["Next.js 15", "Llama 3.3", "Gemini Pro", "MongoDB", "Groq SDK"].map((stack) => (
                <span key={stack} className="px-2 py-1 bg-white border border-slate-200 text-[10px] font-bold rounded uppercase tracking-wider text-slate-400">
                  {stack}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white">
            © 2026 CodeLumina. CSE Thesis Project | Developed by [Your Name].
          </p>
          <div className="flex gap-6 text-xs text-white">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};