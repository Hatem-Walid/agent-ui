import React, { useState } from "react";

const ScanForm = ({ onStartScan, isScanning }) => {
  const [targetUrl, setTargetUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!targetUrl.trim()) return alert("Please enter a valid URL");
    onStartScan(targetUrl);
    setTargetUrl("");
  };

  return (
    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-red-500">Start New Scan</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="url"
          placeholder="Enter website URL (e.g. https://example.com)"
          className="flex-1 bg-black text-gray-200 border border-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-red-600"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          disabled={isScanning}
        />
        <button
          type="submit"
          disabled={isScanning}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            isScanning ? "bg-gray-600 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isScanning ? "Scanning..." : "Start Scan"}
        </button>
      </form>
    </div>
  );
};

export default ScanForm;
