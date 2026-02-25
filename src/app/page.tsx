
import { Hero } from "@/components/modules/landing/Hero";
import { ResearchStats } from "@/components/modules/landing/ResearchStats";
;
import { Features } from "@/components/modules/landing/Features";


import { ModelComparison } from "@/components/modules/landing/ComparisonSection";
import MethodologyPage from "./methodology/page";




export default function LandingPage() {
  return (
    <div className="bg-brand-dark min-h-screen">

      <main>
        <Hero />
        <ResearchStats />
        <MethodologyPage />
        <Features />
        <ModelComparison/>
      </main>

    </div>
  );
}