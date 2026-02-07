import React from "react";
import ReactDOM from "react-dom/client";

import "../css/app.css";

import { StudioApp } from "@/components/app/studio-app";

function App() {
  return (
    <StudioApp />
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
