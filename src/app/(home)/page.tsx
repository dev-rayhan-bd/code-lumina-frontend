
import { Hero } from "@/components/modules/landing/Hero";
import { ResearchStats } from "@/components/modules/landing/ResearchStats";
;
import { Features } from "@/components/modules/landing/Features";
import { ResearchFramework } from "@/components/modules/landing/Framework";








export default function LandingPage() {
  return (
    <div className="bg-brand-dark min-h-screen">

      <main>
        <Hero />
        <ResearchStats />

        <Features />
        <ResearchFramework/>
      </main>

    </div>
  );
}