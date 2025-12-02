import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import  ToastProvider  from "./components/ToastProvider";// ← أضف ده
import { BrowserRouter as Router } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/next"
ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <ToastProvider>
      <Router>
        <App />
        <SpeedInsights/>
      </Router>
    </ToastProvider>
  </React.StrictMode>
);
