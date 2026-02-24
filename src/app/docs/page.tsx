

export default function DocsPage() {
  const steps = [
    { title: "Step 1: Paste Code", desc: "Open the audit editor and paste your Node.js code snippet." },
    { title: "Step 2: Set Ground Truth", desc: "Select whether the code is known to be Safe or Vulnerable." },
    { title: "Step 3: Run AI Review", desc: "Click 'Run Audit' to trigger the LLM-powered analysis engine." },
    { title: "Step 4: Analyze Results", desc: "View detected vulnerabilities, severity ratings, and suggestions." },
  ];

  return (
    <div className="min-h-screen">

      <div className="container mx-auto px-6 pt-32 max-w-3xl">
        <h1 className="text-4xl font-bold mb-10 text-center">User Documentation</h1>
        <div className="space-y-12">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-6">
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                {i+1}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}