import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  SearchCode, 
  FileJson, 
  Lock 
} from "lucide-react";

const features = [
  {
    title: "AI-Powered Auditing",
    description: "Leverage state-of-the-art LLMs (Llama-3.3, Gemini 1.5 Pro) to analyze complex Node.js logic for potential bugs.",
    icon: Zap,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "Security Deep Dive",
    description: "Built-in detection for OWASP Top 10 vulnerabilities like SQL Injection, XSS, and broken access control.",
    icon: ShieldCheck,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    title: "Reliability Metrics",
    description: "Evaluate the consistency of AI responses through automated multi-iteration testing and reliability scoring.",
    icon: BarChart3,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    title: "Static Code Analysis",
    description: "Combining LLM intelligence with traditional static analysis to reduce false positives in vulnerability detection.",
    icon: SearchCode,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    title: "Structured JSON Output",
    description: "Get structured, machine-readable audit reports including severity levels, descriptions, and refactoring tips.",
    icon: FileJson,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    title: "Zero-Trust Architecture",
    description: "Secure handling of your source code snippets with high-level encryption and private data management.",
    icon: Lock,
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm">
            Core Capabilities
          </h2>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Everything you need to <span className="text-primary">evaluate</span> AI security
          </h1>
          <p className="text-slate-500 text-lg">
            Our platform provides a comprehensive suite of tools to test the accuracy and reliability of automated code reviewers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 bg-slate-50/50 group"
            >
              <CardContent className="p-8 space-y-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.bg} transition-transform group-hover:scale-110`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};