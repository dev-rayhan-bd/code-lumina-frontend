import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import {  Menu, ShieldCheck } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";



  const NavLinks = () => (
    <>
      {["Methodology", "Documentation", "Contact"].map((link) => (
        <Link
          key={link}
          href={`/${link.toLowerCase()}`}
          className="text-sm font-semibold text-slate-400 hover:text-brand-primary transition-all relative group"
        >
          {link}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
        </Link>
      ))}
    </>
  );
export const LandingNavbar = async () => {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("accessToken");



  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-brand-primary p-2 rounded-xl transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <ShieldCheck className="text-brand-dark w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-white tracking-tighter">CodeLumina</span>
            <span className="text-[9px] uppercase tracking-[0.4em] font-black text-brand-primary">AI Auditor</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <NavLinks />
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="text-sm font-bold text-white hover:text-brand-primary">Log in</Link>
                <Button asChild className="rounded-full px-8 bg-brand-primary hover:bg-cyan-500 text-brand-dark font-bold transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  <Link href="/login?tab=register">Get Started</Link>
                </Button>
              </>
            ) : (
              <Button asChild variant="outline" className="rounded-full px-8 border-white/10 text-white hover:bg-white/5">
                <Link href="/dashboard">Get Started</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu size={28} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-brand-dark border-white/10 text-white">
                <div className="flex flex-col gap-8 mt-12">
                  <NavLinks />
                  <hr className="border-white/5" />
                  {!isLoggedIn ? (
                    <Button asChild className="bg-brand-primary text-brand-dark font-bold"><Link href="/login">Log in</Link></Button>
                  ) : (
                    <Button asChild variant="outline"><Link href="/dashboard">Get Started</Link></Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};