import { Features } from "@/components/modules/landing/Features";
import { Hero } from "@/components/modules/landing/Hero";
import { Footer } from "@/components/modules/shared/Footer";

import { LandingNavbar } from "@/components/modules/shared/Navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <LandingNavbar />
      <Hero />
      <Features />
      {/* Footer */}
      <Footer/>
    </main>
  );
}