import React from "react";
import ReactDOM from "react-dom/client";

import "../css/app.css";

import { Hero } from "@/components/sections/hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { ComponentShowcase } from "@/components/sections/component-showcase";
import { ScenarioFlow } from "@/components/sections/scenario-flow";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

function App() {
  return (
    <div className="min-h-screen bg-base text-white">
      <Hero />
      <FeatureGrid />
      <ComponentShowcase />
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
