
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, ShieldCheck, Repeat } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="container mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl font-bold text-slate-900 mb-6 text-center">Research Methodology</h1>
        <p className="text-slate-500 text-center max-w-2xl mx-auto mb-16">
          Our evaluation framework focuses on the benchmarking of LLMs against real-world Node.js vulnerabilities.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Brain className="text-primary" />
              <CardTitle>Model Selection</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 text-sm leading-relaxed">
              We utilize <b>Llama-3.3-70b</b> via Groq for high-speed inference and <b>Gemini 1.5 Pro</b> 
              for deep contextual analysis. The system compares their reasoning patterns.
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Target className="text-green-500" />
              <CardTitle>Confusion Matrix</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 text-sm leading-relaxed">
              Each audit is classified into <b>TP, TN, FP, FN</b> based on researcher-provided 
              Ground Truth. This allows precise calculation of Accuracy and Recall.
            </CardContent>
          </Card>
          
          {/* Add more cards for Reliability and Security focus */}
        </div>
      </div>
    </div>
  );
}