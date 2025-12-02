import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import  ToastProvider  from "./components/ToastProvider";// ← أضف ده
import { BrowserRouter as Router } from "react-router-dom";
import { injectSpeedInsights } from '@vercel/speed-insights';

// Inject Vercel Speed Insights (client-side only)
injectSpeedInsights();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <Router>
        <App />
      </Router>
    </ToastProvider>
  </React.StrictMode>
);
