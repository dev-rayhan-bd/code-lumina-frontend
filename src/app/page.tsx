
import { Hero } from "@/components/modules/landing/Hero";
import { ResearchStats } from "@/components/modules/landing/ResearchStats";
import { Features } from "@/components/modules/landing/Features";
import { ComparisonSection } from "@/components/modules/landing/ComparisonSection";



export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
    
      <main className="flex-1 pt-16">
        <Hero />
        <ResearchStats />
        <Features />
        <ComparisonSection />
      </main>
     
    </div>
  );
}