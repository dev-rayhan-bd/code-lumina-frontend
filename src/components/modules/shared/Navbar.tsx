import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export const LandingNavbar = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const isLoggedIn = !!token;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* --- Logo with Animation  --- */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-slate-900 p-2 rounded-xl transition-all duration-500 ease-in-out group-hover:rotate-[15deg] group-hover:scale-110 shadow-lg group-hover:shadow-primary/20">
            <Shield className="text-white w-6 h-6 transition-transform group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tighter text-slate-900 leading-none">
              CodeLumina
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] font-black text-primary mt-1 opacity-80">
              AI Auditor
            </span>
          </div>
        </Link>

        {/* --- Navigation Links (Gap fixed) --- */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Methodology", href: "/methodology" },
            { label: "Documentation", href: "/docs" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-slate-600 hover:text-primary transition-all duration-300 relative group py-2"
            >
              {link.label}
              {/* Bottom active line animation */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* --- Auth Actions --- */}
        <div className="flex items-center gap-5">
          {!isLoggedIn ? (
            <>
              <Link 
                href="/login" 
                className="hidden sm:block text-sm font-extrabold text-slate-700 hover:text-primary transition-colors"
              >
                Log in
              </Link>
              <Button asChild className="rounded-full px-8 font-bold shadow-xl shadow-primary/20 hover:translate-y-[-2px] active:translate-y-[0px] transition-all">
                <Link href="/login?tab=register">Get Started</Link>
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" className="rounded-full px-8 font-extrabold border-2 border-slate-100 hover:bg-slate-50 hover:border-primary/20 transition-all">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};