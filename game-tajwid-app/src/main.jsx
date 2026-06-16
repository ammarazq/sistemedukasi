import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { registerSW } from "virtual:pwa-register";
import { registerServiceWorker } from "./registerSW";

// VitePWA auto registration
registerSW({
  immediate: true,
});

// Manual Service Worker registration (fallback)
registerServiceWorker();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
