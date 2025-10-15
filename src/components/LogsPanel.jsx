import React from "react";

const LogsPanel = ({ logs }) => {
  return (
    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-4 h-64 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2 text-red-500">Logs</h2>
      <ul className="text-gray-300 text-sm">
        {logs.length === 0 ? (
          <li className="text-gray-500">No logs yet...</li>
        ) : (
          logs.map((log, idx) => <li key={idx}>{log}</li>)
        )}
      </ul>
    </div>
  );
};

export default LogsPanel;
