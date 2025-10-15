import React, { useState } from "react";

import ScanForm from "../components/ScanForm";
import LogsPanel from "../components/LogsPanel";
import ScanResults from "../components/ScanResults";
import HistoryTable from "../components/HistoryTable";

const AgentDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [scanResults, setScanResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [history, setHistory] = useState([]);

  const handleStartScan = async (targetUrl) => {
    setIsScanning(true);
    setScanResults(null);
    setLogs((prev) => [...prev, `🚀 Starting scan on ${targetUrl}...`]);

    try {
      // Placeholder API call
      const response = await fetch("http://localhost:5000/api/start-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl }),
      });

      if (!response.ok) throw new Error("Failed to fetch scan results");

      const data = await response.json();

      setScanResults(data.results || []);
      setHistory((prev) => [
        {
          url: targetUrl,
          date: new Date().toLocaleString(),
          result: data.status || "Completed",
        },
        ...prev,
      ]);
      setLogs((prev) => [...prev, "✅ Scan completed successfully!"]);
    } catch (error) {
      setLogs((prev) => [...prev, `❌ Error: ${error.message}`]);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans">

      {/* Header خاص بالـ Dashboard */}
      <header className="bg-[#121212] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-red-500 tracking-wide">
          CyberAgent Dashboard
        </h1>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold">
          Logout
        </button>
      </header>

      {/* محتوى الصفحة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-2 space-y-6">
          <ScanForm onStartScan={handleStartScan} isScanning={isScanning} />
          <ScanResults results={scanResults} />
        </div>

        <div className="space-y-6">
          <LogsPanel logs={logs} />
          <HistoryTable history={history} />
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
