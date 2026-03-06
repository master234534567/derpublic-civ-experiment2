import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const isGitHubPages = window.location.hostname.includes("github.io");

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={isGitHubPages ? "/derpublic-civ-experiment2" : undefined}>
    <App />
  </BrowserRouter>
);
