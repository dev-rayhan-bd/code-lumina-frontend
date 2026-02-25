// src/app/(public)/layout.tsx
import { LandingNavbar } from "@/components/modules/shared/Navbar";
import { Footer } from "@/components/modules/shared/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingNavbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}