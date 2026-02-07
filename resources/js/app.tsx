import React from "react";
import ReactDOM from "react-dom/client";

import "../css/app.css";

import { Hero } from "@/components/sections/hero";
import { EditorShowcase } from "@/components/sections/editor-showcase";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { ComponentShowcase } from "@/components/sections/component-showcase";
import { EngineOverview } from "@/components/sections/engine-overview";
import { TemplateLibrary } from "@/components/sections/template-library";
import { ScenarioFlow } from "@/components/sections/scenario-flow";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

function App() {
  return (
    <div className="min-h-screen bg-base text-white">
      <Hero />
      <EditorShowcase />
      <FeatureGrid />
      <ComponentShowcase />
      <EngineOverview />
      <TemplateLibrary />
      <ScenarioFlow />
      <CTA />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
